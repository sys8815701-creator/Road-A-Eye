# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Road A Eye** — 고속도로 CCTV AI 위험차량 감지 관제 시스템 (Highway CCTV AI Dangerous Vehicle Detection Control System)

FastAPI 백엔드 API 서버. React 프론트엔드(`http://localhost:3000`)와 연동.

## Commands

```bash
# 서버 실행
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# 가상환경 활성화
source venv/bin/activate

# 의존성 설치
pip install -r requirements.txt

# API 문서 (서버 실행 후)
# http://localhost:8000/docs
```

## Environment Setup

`.env` 파일을 `env.example` 기반으로 생성:

```bash
cp env.example .env
```

필수 환경변수:
- `DB_*` — MySQL 접속 정보 (DB명: `road_a_eye`)
- `JWT_SECRET_KEY` — JWT 서명 키
- `ANTHROPIC_API_KEY` — Claude API 키 (챗봇용, 환경변수로 직접 설정)
- `ITS_API_KEY` — 교통정보시스템 API 키 (CCTV 동기화)
- `MAIL_*` — Gmail SMTP (이메일 인증)

DB 테이블은 서버 시작 시 SQLAlchemy `create_all`로 자동 생성됨. 기본 금지 클래스(킥보드, 오토바이 등)도 자동 시딩.

## Architecture

### Layer Structure

```
router (routers/) → service (services/) → ORM model (models/) → MySQL
```

- **`core/`** — 횡단 관심사: `config.py` (pydantic-settings), `database.py` (async SQLAlchemy 세션), `security.py` (JWT + bcrypt)
- **`routers/`** — FastAPI 라우터. 요청 파싱·응답 직렬화만 담당. 비즈니스 로직은 service로 위임
- **`services/`** — 비즈니스 로직. DB 쿼리, 외부 API 호출 포함
- **`models/`** — SQLAlchemy ORM 모델 (테이블 정의)
- **`schemas/`** — Pydantic 요청/응답 스키마

### ORM 모델 파일 분리

| 파일 | 담당 테이블 |
|---|---|
| `models/orm.py` | User, EmailVerification, CCTV, ForbiddenClass, Detection |
| `models/chat_orm.py` | ChatSession, ChatMessage |
| `models/model_orm.py` | ModelVersion |
| `models/board_orm.py` | Notice, Inquiry, FAQ, Archive 등 |

모든 ORM 모델이 `core/database.py`의 `Base`를 상속하므로, 새 모델 파일 추가 시 `main.py`에서 import해야 `create_all`에 포함됨.

### 인증 흐름

`core/security.py`의 `get_current_user`를 `Depends`로 주입. HTTP Bearer 토큰 → JWT 디코딩 → `{"sub": user_no, "login_id": ...}` dict 반환.

회원가입 전 이메일 인증 필수: `POST /auth/email/send-code` → `POST /auth/email/verify` → `POST /auth/register`.

### 주요 기능별 서비스

| 도메인 | 라우터 prefix | 서비스 파일 |
|---|---|---|
| 인증 | `/auth` | `auth_service.py` |
| CCTV 관리·스트림·통계 | `/cctv` | `cctv_service.py`, `stream_service.py` |
| 게시판(공지/문의/FAQ/자료실) | `/board` | `board_service.py` |
| AI 챗봇 | `/chat` | `chat_service.py` |
| AI 모델 버전 관리 | `/models` | `model_service.py` |

### 실시간 스트리밍

- **CCTV MJPEG 스트림**: `stream_service.py`의 `StreamManager`가 `stream_url`별 OpenCV `VideoCapture`를 캐싱. RTSP/HTTP → JPEG 인코딩 → `multipart/x-mixed-replace`. React에서 `<img src="/cctv/{id}/stream">` 로 바로 사용 가능.
- **챗봇 SSE 스트리밍**: `GET /chat/stream`으로 Claude API 스트리밍 응답을 Server-Sent Events로 토큰 단위 전송.

### Claude API 연동

`services/chat_service.py`에서 `anthropic.AsyncAnthropic()` 사용. 모델: `claude-sonnet-4-20250514`. `ANTHROPIC_API_KEY`는 환경변수로 자동 로드.

세션당 최근 20개 메시지를 히스토리로 전달 (`_MAX_HISTORY = 20`).

### 감지 이미지

AI 서버가 `POST /cctv/detections`로 감지 기록 저장 시 이미지 경로를 함께 전송. 이미지는 `./captures` 디렉터리에 저장되고 `/images/{파일명}` 으로 정적 서빙.

### ITS API 연동

`POST /cctv/its/sync` — 한국 교통정보시스템(ITS) API에서 고속도로 CCTV 목록을 받아 DB에 동기화. `ITS_API_KEY` 필요.
