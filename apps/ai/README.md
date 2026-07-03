# Road_A_Eye — AI 기반 고속도로 CCTV 모니터링 시스템

> AI-X Final Project | Branch: `ljk`

## 프로젝트 개요

고속도로 CCTV 영상을 실시간으로 분석하여 금지차량(경운기, 전동킥보드, 휠체어 등)을 탐지하고 관리자에게 알림을 제공하는 AI 모니터링 시스템입니다.

---

## 서버 구성

| 서버 | IP | 역할 |
|---|---|---|
| ai4jo2 | <AI_SERVER_IP> | AI 추론 (road-ai :8001), 챗봇 (chatbot :8000) |
| back4jo2 | <BACK_SERVER_IP> | FastAPI 백엔드 :8000, MySQL |
| front4jo2 | <FRONT_SERVER_IP> | Next.js 프론트엔드 :3000 |

---

## 폴더 구조

```
Road_A_Eye/
├── road-ai/                  # AI 추론 서비스 (FastAPI, port 8001)
├── highway-chatbot-server/   # AI 챗봇 서비스 (FastAPI, port 8000)
└── highway-website/          # Next.js 챗봇 UI (port 3000)
```

---

## road-ai

YOLOv11 + YOLOv8 앙상블 기반 실시간 금지차량 탐지 서비스입니다.

### 구조

```
road-ai/
├── app/
│   ├── api/v1/          # REST API 엔드포인트
│   │   ├── cctv.py      # CCTV 스트림 관리
│   │   ├── detection.py # 탐지 결과 조회
│   │   ├── keras.py     # Keras 모델 테스트
│   │   └── yolo.py      # YOLO 모델 정보
│   ├── modules/
│   │   ├── its/
│   │   │   ├── pipeline.py  # 프레임 분석 파이프라인
│   │   │   └── service.py   # CCTV 스트림 워커 관리
│   │   └── yolo/
│   │       └── detector.py  # YOLO 탐지기
│   └── core/
│       └── events.py    # 앱 시작/종료 이벤트
├── models/
│   ├── yolo/            # YOLO 모델 가중치 (*.pt 제외)
│   └── keras/           # Keras 모델 가중치 (*.keras 제외)
├── static/              # 학습 가이드 및 스크립트
├── train_keras_gate_v15.py  # Keras 게이트 모델 학습 스크립트
└── requirements.txt
```

### 탐지 모델

| 모델 | 역할 | 가중치 |
|---|---|---|
| YOLOv11m (v3) | 1차 탐지 (가중치 0.65) | `yolov11m_v3_best.pt` |
| YOLOv8 | 2차 탐지 (가중치 0.35) | 앙상블 |
| Keras MobileNetV2 | 게이트 분류기 (학습 중) | `highway_model_v15_best.keras` |

### 탐지 대상 클래스 (9종)

`Electric Scooter`, `Wheelchair`, `Bicycle`, `Motorcycle`, `Cultivator`, `Stacker`, `Carrier`, `Handcart`, `Pedestrian`

### 실행

```bash
cd road-ai
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

### 주요 API

| 메서드 | 경로 | 설명 |
|---|---|---|
| POST | `/its/stream/start` | CCTV 스트림 시작 |
| POST | `/its/stream/stop` | 스트림 중지 |
| GET  | `/its/stream/status` | 스트림 상태 확인 |
| POST | `/ai/test` | AI 모델 단일 이미지 테스트 |

---

## highway-chatbot-server

고속도로 관련 질문에 답변하는 OpenAI 기반 SSE 스트리밍 챗봇입니다.

### 구조

```
highway-chatbot-server/
├── main.py          # FastAPI 단일 파일 서버
└── requirements.txt
```

### 핵심 기능

- **SSE 스트리밍**: 토큰 단위 실시간 응답
- **키워드 시스템**: DB의 `chat_keywords` 테이블 기반 우선 응답
  - `fixed` 모드: 저장된 응답을 그대로 반환
  - `reference` 모드: 저장된 내용을 컨텍스트로 추가 후 OpenAI 호출
- **세션 관리**: `chat_sessions`, `chat_messages` 테이블

### 엔드포인트

```
GET /chat/stream?message=<text>&session_no=<int>&user_no=<int>
```

### 실행

```bash
cd highway-chatbot-server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

---

## highway-website

챗봇 UI를 포함한 Next.js 15 웹 애플리케이션입니다.

### 구조

```
highway-website/
├── app/
│   ├── page.tsx         # 메인 페이지
│   ├── layout.tsx       # 레이아웃
│   └── api/chat/        # 챗봇 API 프록시
├── components/
│   └── Chatbot.tsx      # SSE 스트리밍 챗봇 컴포넌트
├── next.config.ts
└── package.json
```

### 실행

```bash
cd highway-website
npm install
npm run dev
```

---

## Keras 게이트 모델 학습 (v15)

현재 Keras MobileNetV2 이진 분류 게이트 모델을 학습 중입니다.

```bash
# GPU 환경에서 실행 (RTX 5060 권장)
pip install tf-keras scikit-learn Pillow
python road-ai/train_keras_gate_v15.py
```

**데이터 구성**
- safe (정상 프레임): 2,148장
- prohibited (금지차량): 2,148장
- 입력 해상도: 224×224 (MobileNetV2 기본)
- 목표 Recall: 0.85 이상

---

## 환경 변수 (.env)

각 서비스는 루트에 `.env` 파일이 필요합니다. (보안상 저장소에 포함되지 않음)

**road-ai/.env 필수 항목**
```
AI_API_KEY=...
DB_HOST=<DB_SERVER_IP>
DB_USER=...
DB_PASSWORD=...
DB_NAME=ai_db
BACKEND_URL=http://<BACK_SERVER_IP>:8000
```

**highway-chatbot-server/.env 필수 항목**
```
OPENAI_API_KEY=...
DB_HOST=<DB_SERVER_IP>
DB_USER=...
DB_PASSWORD=...
DB_NAME=chat_db
```
