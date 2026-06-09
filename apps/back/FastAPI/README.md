# Road A Eye — Back-end (FastAPI)

고속도로 CCTV AI 위험차량 감지 관제 시스템의 **백엔드 API 서버**입니다.
Back 서버(192.168.0.247 :8000)에서 동작하며, Next.js 프론트엔드(:3000) 및 AI 서버(:8001)와 연동합니다.

## 기술 스택

- **FastAPI** 0.115 + **Uvicorn** (ASGI)
- **SQLAlchemy 2.0** (async) + **aiomysql** — MySQL 비동기 접속
- **JWT**(pyjwt) + **bcrypt** — 인증
- **fastapi-mail** — Gmail SMTP 이메일 인증
- **OpenCV**(headless) — CCTV MJPEG 스트리밍
- **Anthropic Claude API** — AI 챗봇 (SSE 스트리밍)

## 실행

```bash
# 1) 가상환경
python -m venv venv && source venv/bin/activate

# 2) 의존성
pip install -r requirements.txt

# 3) 환경변수 — env.example 기반으로 .env 생성
cp env.example .env   # 값 채우기 (DB/JWT/MAIL/ITS 등)

# 4) 서버 실행 (:8000)
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# API 문서: http://localhost:8000/docs
```

> DB 테이블은 서버 시작 시 SQLAlchemy `create_all`로 자동 생성됩니다. 기본 금지 클래스(킥보드·오토바이 등)도 자동 시딩됩니다.
> `ANTHROPIC_API_KEY`는 `.env`가 아닌 **환경변수**로 직접 설정합니다.

## 아키텍처

계층 구조: **router → service → ORM model → MySQL**

| 디렉터리 | 역할 |
|----------|------|
| `core/`     | 횡단 관심사 — `config.py`(설정), `database.py`(async 세션), `security.py`(JWT+bcrypt) |
| `routers/`  | FastAPI 라우터. 요청 파싱·응답 직렬화만 담당 |
| `services/` | 비즈니스 로직. DB 쿼리·외부 API 호출 |
| `models/`   | SQLAlchemy ORM 모델(테이블 정의) |
| `schemas/`  | Pydantic 요청/응답 스키마 |

### 도메인별 라우터·서비스

| 도메인 | prefix | 라우터 | 서비스 |
|--------|--------|--------|--------|
| 인증 | `/auth` | `auth.py` | `auth_service.py` |
| CCTV 관리·스트림·통계 | `/cctv` | `cctv.py` | `cctv_service.py`, `stream_service.py` |
| 게시판(공지/문의/FAQ/자료실/버그) | `/board` | `board.py` | `board_service.py` |
| AI 챗봇 | `/chat` | `chat.py` | `chat_service.py` |
| AI 모델 버전 관리 | `/models` | `model.py` | `model_service.py` |
| 관리자 | `/admin` | `admin.py` | `admin_service.py` |
| 환경설정 | `/settings` | `settings.py` | `settings_service.py` |
| ITS 동기화 | `/cctv/its` | `its.py` | — |
| WebSocket | `/ws` | `ws.py` | `ws_service.py` |

### ORM 모델 분리

| 파일 | 담당 테이블 |
|------|-------------|
| `models/orm.py` | User, EmailVerification, UserSetting, CCTV, ForbiddenClass, Detection |
| `models/board_orm.py` | Notice, Inquiry, FAQ, Archive, BugPost 등 |
| `models/chat_orm.py` | ChatSession, ChatMessage |
| `models/model_orm.py` | ModelVersion |
| `models/admin_orm.py` | ActivityLog, SystemConfig |

> 이 서버(247)는 `member_db`·`board_db`·`chat_db`만 `create_all` 대상입니다. `ai_db`는 AI 서버(246) 담당.

## 주요 기능

- **인증 흐름**: 이메일 인증(`/auth/email/send-code` → `/auth/email/verify`) → 회원가입(`/auth/register`). JWT Bearer 토큰 → `get_current_user` 의존성 주입.
- **CCTV MJPEG 스트림**: `StreamManager`가 `stream_url`별 OpenCV `VideoCapture`를 캐싱, RTSP/HTTP → JPEG → `multipart/x-mixed-replace`. 프론트에서 `<img src="/cctv/{id}/stream">`로 사용.
- **챗봇 SSE 스트리밍**: `GET /chat/stream`으로 Claude(`claude-sonnet-4`) 응답을 토큰 단위 Server-Sent Events 전송. 세션당 최근 20개 메시지 히스토리.
- **감지 이미지**: AI 서버가 `POST /cctv/detections`로 감지 기록 저장 → 이미지는 `./captures`에 저장되고 `/images/{파일명}`으로 정적 서빙.
- **ITS 연동**: `POST /cctv/its/sync` — 한국 교통정보시스템(ITS) API에서 고속도로 CCTV 목록을 받아 DB 동기화.

## 환경변수 (`env.example` 참고)

`DB_*`(MySQL) · `JWT_SECRET_KEY` · `MAIL_*`(Gmail SMTP) · `EMAIL_CODE_EXPIRE_MINUTES` · `ITS_API_KEY` · `IMAGE_SAVE_DIR`/`IMAGE_BASE_URL`, 그리고 환경변수로 직접 설정하는 `ANTHROPIC_API_KEY`.

## ⚠️ 보안

이 폴더에는 코드만 포함됩니다. 다음은 **의도적으로 제외**되었습니다:
- `.env` / `.env.backup-*` — DB 비밀번호·JWT 키·API 키 (절대 커밋 금지)
- `venv/` — `pip install -r requirements.txt`로 복원
- `captures/` — 사용자 업로드 첨부(개인정보 가능) · `*.log` · `__pycache__/`
