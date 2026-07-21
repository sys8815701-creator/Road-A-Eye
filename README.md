# 🛣️ ROAD A EYE
### AI 기반 고속도로 CCTV 위험 물체 감지 관제 시스템

> YOLOv8s · YOLOv11m · Keras 3모델 앙상블 기반 실시간 위험 물체 탐지 · 통합 관제 대시보드 · AI 관제 어시스턴트를 하나의 플랫폼에서 제공합니다.

---

## 링크

- FastAPI 백엔드 자동 문서: http://localhost:8000/docs
- AI 추론 서버 자동 문서: http://localhost:8001/docs
- AI 챗봇 서버 자동 문서: http://localhost:8002/docs
- 홈페이지: [http://localhost:3000](http://mbc-sw.iptime.org:3241/main)

---

## 배경

국토교통부 통계에 따르면 고속도로 교통사고의 주요 원인 중 하나는 킥보드 · 오토바이 · 건설 차량 등 **통행 금지 차량의 진입**과 **역주행**입니다. 이러한 사고는 짧은 시간 안에 다중 추돌로 이어져 인명 피해가 크지만, 기존 관제 방식은 수십 개의 CCTV 화면을 관제 요원이 육안으로 모니터링하는 구조여서 즉각적인 대응에 한계가 있습니다.

이 과정에서 발생하는 구조적 문제는 크게 세 가지입니다.

**첫째, 육안 모니터링의 집중력 한계입니다.**
수십 개의 CCTV를 동시에 주시하는 것은 인지 부하 측면에서 근본적인 한계를 가집니다. 짧은 순간 화면을 놓치면 위험 상황을 인지하지 못한 채 지나칠 수 있습니다.

**둘째, 이상 상황 탐지의 지연입니다.**
위험 차량이 진입한 뒤 관제 요원이 이를 인지하고 대응 조치를 취하기까지 걸리는 시간이 사고 발생 여부를 결정짓는 핵심 변수입니다. 수동 모니터링 체계에서는 이 탐지 지연을 최소화하기 어렵습니다.

**셋째, 반복 패턴 데이터 부재입니다.**
특정 구간에서 위험 차량이 반복적으로 출현하더라도, 수기 기록 방식으로는 패턴을 통계적으로 분석하고 예방 조치를 취하는 것이 사실상 불가능합니다.

**ROAD A EYE**는 이러한 문제의식에서 출발해, CCTV 영상 속 위험 물체를 AI가 자동으로 감지하고, 감지부터 알림 · 기록 · 통계까지 이어지는 흐름을 하나의 관제 플랫폼으로 통합하는 것을 목표로 기획되었습니다.

---

## 수요조사

**1) 관련 언론 보도 사례**
- MBC 뉴스투데이(2026년 3월 17일) — 고속도로 오토바이 진입 사고
- SBS 뉴스(2025년 10월 31일) — 고속도로 전동킥보드 진입 사고
- 채널A(2026년 2월 4일) — 전동킥보드 등 개인형 이동장치 위험 사례

**2) 기존 관제 방식의 한계**
수십 대의 CCTV를 관제 요원이 육안으로 순차 확인하는 현재 방식으로는 위험 물체 진입을 즉시 포착하기 어렵고, 확인 · 대응까지의 시간 지연이 2차 사고로 이어질 위험이 있습니다. 기존에는 위험 상황이 지나간 뒤에야 영상을 되짚어보는 사후 대응에 머무를 수밖에 없었습니다.

**3) 핵심 니즈 요약**
여러 매체에서 꾸준히 보도되는 진입 금지 차량 · 개인형 이동장치 사고 사례는, CCTV 영상을 실시간으로 분석해 위험 물체를 자동으로 감지하고 관제 요원에게 즉시 알리는 시스템에 대한 사회적 수요가 분명함을 보여줍니다. 본 프로젝트는 이러한 수요에서 출발했습니다.

---

## 목적

**CCTV 영상 → YOLO · Keras 앙상블 자동 감지 → 관제 대시보드 실시간 반영**

---

## 목표

본 프로젝트는 위 문제를 해소하기 위해 실시간 CCTV 스트리밍, YOLO · Keras 앙상블 기반 위험 물체 자동 감지, 통계 · 히트맵 분석, AI 관제 어시스턴트를 결합한 통합 관제 플랫폼 구축을 목표로 합니다. 관제 요원의 육안 모니터링 의존도를 낮추고, 감지부터 알림 · 기록까지 이어지는 흐름을 자동화하는 것을 핵심 설계 원칙으로 삼았습니다.

- **1차** — CCTV 실시간 MJPEG 스트리밍 및 등록 · 관리
- **2차** — YOLO 기반 위험 물체 자동 감지 및 감지 기록 저장
- **3차** — 감지 통계 · 히트맵 · 반복 출현 패턴 분석
- **4차** — ITS API 연동을 통한 고속도로 CCTV 자동 동기화
- **최종** — AI 관제 어시스턴트 + 소셜 로그인 + 게시판 + 모델 버전 관리를 통합한 고속도로 CCTV AI 관제 플랫폼 구축

---

## 시스템 구조

```
관제 요원 (브라우저)
   │
   ▼
Next.js 프론트엔드 (Front 서버) ───────────────────┐
   │ REST API / WebSocket                        │ SSE
   ▼                                              ▼
FastAPI 백엔드 (Back 서버)                    AI 챗봇 서버 (highway-chatbot-server)
JWT 인증 · REST API · AI 프록시                공개 홈페이지 전용 · OpenAI gpt-4.1-mini
GPT-4o 기반 관제 어시스턴트
   │                        │
   ▼                        ▼
MySQL DB (DB 백업 서버)     AI 추론 서버 (road-ai)
4개 DB, Master-Master 이중화    Keras 게이트 → YOLOv8 + YOLOv11 Soft Voting
                                 │
                                 ▼
                        고속도로 CCTV 스트림 (ITS API, RTSP/HTTP)
```

5개 서버로 역할을 분산했습니다.

- **AI 추론 서버(road-ai)** — Keras 게이트와 YOLOv8 · YOLOv11 앙상블 추론 전담
- **백엔드 서버** — REST API · JWT 인증 · AI 프록시와 함께, GPT-4o 기반 관제 어시스턴트(관제 대시보드 전용) 직접 호출
- **AI 챗봇 서버(highway-chatbot-server)** — 공개 홈페이지에서 쓰이는 경량 챗봇(OpenAI gpt-4.1-mini)을 담당하며, 관제 대시보드의 어시스턴트와는 독립적으로 동작
- **프론트 서버** — DB에 직접 접속하지 않고 백엔드 · 챗봇 서버의 API만 호출
- **DB 백업 서버** — 4개 DB(member · board · ai · chat)의 복제본을 보관하며, Keepalived 기반 VIP로 장애 시 자동 페일오버

---

## 전체 디렉토리 구조

```
Road-A-Eye/
├── ai/
│   ├── road-ai/                          # AI 추론 서버 (FastAPI)
│   │   ├── app/api/v1/                   # keras · yolo · its 엔드포인트 (chat · llm은 미구현 스캐폴드)
│   │   ├── app/modules/                  # keras(분류) · yolo(탐지) · its(연동 · 앙상블 파이프라인)
│   │   ├── app/core/                     # config · security · events
│   │   ├── app/infrastructure/           # model_registry · database · storage · cache
│   │   ├── train_keras_gate_v15.py       # Keras 게이트 모델(현재 배포 버전) 학습 스크립트
│   │   ├── train_keras_v16.py            # Keras 분류 모델 차기 버전 학습 스크립트
│   │   ├── upload_server.py
│   │   ├── .env.example                  # 환경변수 템플릿
│   │   └── requirements.txt
│   │       # models/ (Keras · YOLO 가중치)는 용량 문제로 저장소에 포함하지 않음
│   │
│   └── highway-chatbot-server/           # 공개 홈페이지용 AI 챗봇 서버 (FastAPI · SSE · OpenAI gpt-4.1-mini)
│       ├── main.py
│       ├── env.example
│       └── requirements.txt
│
├── backend/
│   └── FastAPI/                          # 백엔드 (FastAPI)
│       ├── main.py                       # 앱 진입점 (lifespan, 라우터 등록)
│       ├── env.example                   # 환경변수 템플릿
│       ├── core/                         # config · database · security
│       ├── models/                       # SQLAlchemy ORM (User, CCTV, Detection, Board, Chat, Admin ...)
│       ├── routers/                      # auth · cctv · board · chat · model · ws · its · admin · settings
│       └── services/                     # 비즈니스 로직 (StreamManager, gpt-4o 챗봇 호출 등)
│
├── frontend/
│   └── project-html/                     # 프론트엔드 (Next.js 16 · React 19)
│       ├── app/dashboard/                # 통합 관제 대시보드
│       ├── app/analysis/                 # 분석 센터
│       ├── app/admin/                    # 관리자
│       ├── app/board/                    # 공지 · 문의 · FAQ · 자료실 · 버그
│       ├── app/presentation/             # 프로젝트 시연 프레젠테이션(슬라이드 21장 · PPTX 다운로드)
│       ├── components/                   # 공통 UI · 대시보드 위젯
│       └── lib/                          # api client · 알림 · 스트림 훅
│
├── docs/
│   └── images/                           # README에 사용된 화면 스크린샷
│
└── infra/                                # 인프라 설정 예시(민감 정보를 제거한 템플릿)
    ├── keepalived/                       # MySQL HA용 VRRP 설정 예시
    └── systemd/                          # AI 서버 자동 기동 유닛 예시
```
---

## 기술 스택

**개발 환경**
Ubuntu 24.04 LTS · VSCode Remote SSH

**프론트**
Next.js 16(App Router) · React 19 · TypeScript · CSS Modules · recharts(통계 시각화)

**백엔드**
FastAPI · Uvicorn · Python 3.11+ · SQLAlchemy 2.0(비동기 ORM) + aiomysql · JWT(PyJWT) · bcrypt · OpenCV(headless, RTSP → MJPEG 스트리밍)

**AI · 모델**
Keras(MobileNetV2 전이학습, 1차 분류 게이트) · YOLOv8s / YOLOv11m(Ultralytics, 위험 물체 탐지) · OpenAI API(gpt-4o — 관제 어시스턴트, gpt-4.1-mini — 홈페이지 챗봇) · SSE 스트리밍

**DB**
MySQL 8.0, Master-Master 복제 + Keepalived VIP 이중화

**인프라 · 연동 · 협업**
Keepalived(Failover) · ITS API(고속도로 CCTV 연동) · Git · Notion

---

## AI 탐지 대상

**1) 분류 · 탐지 클래스 (총 10종)**
전동킥보드 · 경운기 · 굴착기 · 리어카 · 지게차 · 트랙터 · 전동휠체어 · 오토바이 · 사람 — 이상 9종이 진입 금지 대상이며, **차량(car)**은 정상 통행 차량으로 구분되는 허용 클래스입니다. 클래스 목록은 배포된 Keras 모델의 메타데이터로 관리되며, 모델 파일은 용량 문제로 이 저장소에는 포함되어 있지 않습니다.

**2) AI 관제 어시스턴트 분석 항목** (`backend/FastAPI/services/chat_service.py`)
- **감지 현황 요약** — "오늘 감지된 위험 물체는 몇 건인가요?"
- **위험 구간 분석** — "가장 위험 감지가 많은 CCTV 구간은 어디인가요?"
- **반복 패턴 파악** — "이번 주 반복 출현 패턴이 있나요?"
- **미처리 건 안내** — "처리되지 않은 감지 기록이 있나요?"
- **CCTV 운영 현황** — "현재 비활성 상태인 CCTV가 있나요?"
- **시스템 상태** — "AI 모델 현재 버전은 무엇인가요?"

**3) 모델 개발 과정 및 성능**
데이터셋은 총 6,903장(Train 4,470장 · 64.8%, Validation 1,600장 · 23.2%, Test 833장 · 12.1%)으로 구성했습니다.

Keras 분류 모델은 MobileNetV2 전이학습을 기반으로 1차 ~ 14차 반복 실험(optimizer · backbone · 해상도 비교)을 거쳐 v14 모델에서 정확도 약 99%를 달성했습니다. 이후 게이트 전용으로 재학습한 v15 모델(`train_keras_gate_v15.py`)이 현재 배포되어 있으며, 차기 버전 학습 스크립트(`train_keras_v16.py`)도 함께 포함되어 있습니다.

YOLOv8s 탐지 모델은 1차 학습 기준 Precision 0.930 · Recall 0.923 · mAP50 0.948 · mAP50-95 0.724를 기록했습니다.

YOLOv11m 탐지 모델은 1 · 2 · 3차에 걸쳐 반복 학습했습니다. 2차에서는 imgsz · multi_scale을 과도하게 적용해 학습 시간이 급증하고 성능이 떨어졌으나, 3차에서 설정을 안정화(imgsz 640, lr0 0.001)해 이를 바로잡았습니다. 최종 3차 모델은 mAP50 99.22%(1차 대비 +0.07%p), mAP50-95 84.30%를 기록했고, 학습 시간도 750분에서 95분으로 크게 단축됐습니다.

최종 배포 구조는 Keras를 1차 게이트로 사용해 금지 물체 가능성을 먼저 판단한 뒤, YOLOv8s와 YOLOv11m을 함께 실행해 IoU 0.30 이상인 탐지 쌍을 가중 평균(YOLOv8s 0.35 · YOLOv11m 0.65)으로 병합하는 **3모델 앙상블(Soft Voting)** 입니다(`ai/road-ai/app/modules/its/pipeline.py`). 한 모델에서만 감지된 경우에는 신뢰도 0.20 이상인 것만 채택합니다. 연산량은 줄이면서 탐지 정확도는 높이는 것을 목표로 설계했습니다.

**4) 탐지 한계 및 보완 방식**
YOLO 신뢰도(confidence) 임계값을 조정해 오탐 · 미탐 균형을 유지하고, 모델 버전 관리 기능으로 교체 이력을 추적합니다. 네트워크 상태에 따라 RTSP 스트림 품질이 저하될 경우 `StreamManager`가 자동으로 재연결을 시도합니다.

---

## 주요 기능

**1) 사용자 관리**
회원가입 · 로그인 · JWT 인증 · 소셜 로그인(네이버 · 카카오 · 구글), 이메일 인증 기반 가입, 사용자 설정 · 프로필 관리를 제공합니다.

**2) CCTV 관리**
CCTV 수동 등록 · 수정 · 삭제(비활성 처리), ITS API 자동 동기화, 활성 / 비활성 토글을 지원합니다.

**3) 실시간 스트리밍**
RTSP · HTTP 스트림을 MJPEG으로 변환해 브라우저에 직접 전송하며, CCTV별 OpenCV `VideoCapture`를 캐싱 · 재사용하고 단일 프레임 스냅샷도 제공합니다.

**4) 위험 물체 감지**
AI 서버가 감지 시 이미지 · 메타데이터를 백엔드로 전송해 기록을 저장합니다. 감지 클래스 · 신뢰도 · 이미지 경로 · 상태를 저장하며, 상태는 신규 → 확인 중 → 처리 완료로 관리합니다. 금지 클래스(킥보드 · 오토바이 · 건설 차량 · 역주행 차량 등)는 관리자가 동적으로 설정할 수 있습니다.

**5) 통계 및 분석**
일별 감지 건수 추이, CCTV별 위험도 히트맵, 반복 출현 패턴, 미확인 감지 건수를 제공합니다.

**6) AI 관제 어시스턴트**
gpt-4o 기반 자연어 질의응답, 세션별 대화 히스토리 유지(최대 20개), SSE 스트리밍으로 토큰 단위 실시간 응답, 감지 기록 · CCTV 현황 기반 상황 분석 및 조언을 제공합니다.

**7) 게시판**
공지사항, 1:1 문의(첨부 이미지), FAQ, 자료실, 버그 리포트를 운영합니다.

**8) AI 모델 버전 관리**
배포된 YOLO / Keras 모델 버전 이력을 등록하고, 활성 모델 지정 및 메모를 관리합니다.

---

## 실시간 처리 구조

본 시스템은 FastAPI(Python) + Next.js(TypeScript) 서버 구조로 구성되며, 클라이언트 - 서버 간 실시간 통신을 위해 MJPEG 스트림 · SSE · WebSocket을 용도별로 함께 사용합니다.

```
관제 요원 브라우저
  │
  ├─ HTTP (REST API)
  │    └─ fetch/axios → FastAPI 라우터 → SQLAlchemy → MySQL
  │
  ├─ MJPEG 스트림
  │    └─ <img src="/cctv/{id}/stream"> → StreamManager(OpenCV VideoCapture 캐싱)
  │
  ├─ SSE (AI 챗봇 스트리밍)
  │    └─ EventSource /chat/stream → chat_service → OpenAI API 토큰 단위 전달
  │
  └─ WebSocket (실시간 알림)
       └─ ws.py → 감지 이벤트 브로드캐스트
```

- **CCTV 목록 조회** — 클라이언트가 REST API를 호출하면 FastAPI가 MySQL에서 조회해 JSON으로 응답합니다.
- **실시간 스트리밍** — `<img>` 태그가 MJPEG 스트림 엔드포인트를 직접 구독하며, `StreamManager`가 CCTV별 `VideoCapture`를 캐싱해 재사용합니다.
- **위험 물체 감지** — AI 서버가 YOLO · Keras 추론 결과를 백엔드로 전송하면 감지 기록이 저장되고, WebSocket으로 관제 화면에 즉시 알림됩니다.
- **AI 관제 어시스턴트** — 사용자 질문이 `/chat/stream`으로 전달되면 실시간 감지 · CCTV 데이터를 컨텍스트로 삽입해 OpenAI API가 답변을 생성하고, SSE로 글자 단위 스트리밍합니다.

공개 홈페이지의 챗봇(`ai/highway-chatbot-server`의 `/chat/stream`)은 위 백엔드 흐름과 별도로 동작하며, 자체 MySQL 연결과 OpenAI gpt-4.1-mini 호출을 통해 SSE 응답을 전송합니다.

---

## JWT 인증 흐름

**1) 이메일 · 비밀번호 로그인**
사용자가 이메일 · 비밀번호를 입력해 로그인을 요청하면 FastAPI가 DB에서 사용자를 조회해 bcrypt로 비밀번호를 검증합니다. 검증에 성공하면 JWT Access Token을 발급하고, 프론트엔드는 이를 localStorage에 저장해 이후 모든 요청에 `Authorization: Bearer <JWT>`를 자동으로 첨부합니다. 요청은 `get_current_user()`가 토큰을 검증한 뒤 처리됩니다.

**2) 소셜 로그인 (네이버 · 카카오 · 구글)**
로그인 버튼을 누르면 FastAPI가 OAuth 인가 URL을 생성해 Provider로 리다이렉트합니다. Provider 인증이 끝나면 콜백에서 Authorization Code를 Access Token으로 교환하고, Provider로부터 받은 사용자 정보로 신규 등록 또는 기존 계정을 연동한 뒤 자체 JWT를 발급합니다. 프론트엔드 콜백 페이지로 리다이렉트되면 토큰을 저장합니다.

**3) 보안 설계 포인트**
JWT Payload에는 `user_no`, `login_id`만 포함해 민감 정보 노출을 최소화했습니다. 이메일 인증을 완료한 계정만 로그인을 허용하며, 관리자 엔드포인트는 `require_admin` 의존성으로 권한을 분리합니다. 로그인 시도 횟수를 제한해 Brute Force 공격을 방지합니다.

---

## 프론트 화면 구성

Next.js 16 App Router 기반으로 구성되었으며, 전 페이지 다크 · 라이트 테마 전환을 지원합니다. 총 50개 페이지, 11개 공통 컴포넌트로 구현되었습니다.

**1) 화면 구성**
- 로그인 / 회원가입 — 이메일 · 소셜 로그인
- 통합 관제 대시보드 — 실시간 CCTV 뷰, 오늘의 감지 건수 · 활성 CCTV · AI 정확도
- 스트림 관리 — 전국 CCTV 검색 → AI 분석 시작 · 중지
- AI 모델 비교 — 이미지 업로드로 여러 모델 결과 비교
- 분석 센터 — 통계 리포트, 위험 구간 히트맵, 감지 기록 검토, AI 모델 관리
- 관리자 시스템 — 사용자 관리, 활동 로그, 정지 문의 처리
- 게시판 — 공지사항 · FAQ · 1:1 문의 · 자료실 · 버그 리포트
- 마이페이지 — 알림 이력 · 환경설정 · 프로필
- 프로젝트 시연 프레젠테이션 — 슬라이드 21장, PPTX 다운로드 지원

**2) UI 설계 원칙**
다크 · 라이트 테마 전환 시 깜빡임을 방지하고, 공통 모달 시스템으로 22개 페이지의 alert · confirm을 일괄 교체했습니다. 메뉴는 비회원 · 일반 회원 · 관리자 권한에 따라 다르게 노출됩니다.

---

## 기대 효과

**위험 탐지 자동화** — YOLO · Keras 앙상블이 CCTV 영상을 실시간으로 분석해 위험 물체를 즉시 감지합니다. 관제 요원의 육안 모니터링 부담을 최소화합니다.

**대응 시간 단축** — 감지 즉시 대시보드 알림 및 WebSocket Push로 관제 요원이 신속하게 상황을 파악할 수 있습니다.

**데이터 기반 예방** — 감지 이력 · 히트맵 · 반복 패턴 통계를 통해 위험 구간을 사전에 파악하고 예방 조치를 수립할 수 있습니다.

**AI 관제 지원** — 자연어로 감지 현황 · CCTV 운영 상태를 즉시 조회할 수 있어, 관제 요원의 상황 판단 속도가 향상됩니다.

**안정적인 인프라** — Master-Master DB 복제와 Keepalived 자동 페일오버로 단일 서버 장애 상황에서도 서비스 연속성을 확보했습니다.

---

## 향후 프로젝트 확장 방향

**단기 계획** — Ollama 기반 로컬 LLM + LangChain 적용으로 오탐률을 줄이고 응답 성능을 향상시킵니다.

**중기 계획** — 축적된 탐지 데이터를 활용해 Fine-tuning 기반 자체 모델로 고도화합니다.

**장기 계획** — 차선 기반 위치 분석을 통한 실시간 위험도 관리로 확장해, 예측형 관제 시스템으로 진화시킵니다.

**그 외** — 차량 번호판 인식(LPR) 연동, 모바일 관제 앱, 고속도로 VMS 연동 전광판 경고, 엣지 컴퓨팅 배포를 검토하고 있습니다.

---

## 로컬 실행

### 요구 사항
- Python 3.11+, Node.js 20+
- MySQL 8.0+(4개 DB 생성 필요: member_db · board_db · ai_db · chat_db)
- OpenCV 의존성(`libglib2.0-0`, `libgl1-mesa-glx` 등)
- AI 추론 서버(`ai/road-ai`)를 실제로 구동하려면 Keras · YOLO 모델 가중치 파일이 별도로 필요합니다. 가중치 파일은 용량 문제로 이 저장소에 포함되어 있지 않습니다.

### 백엔드 (`backend/FastAPI`)
```bash
cd backend/FastAPI
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp env.example .env
# .env 파일에서 DB 접속 정보, JWT_SECRET_KEY, OPENAI_API_KEY 등 입력
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### AI 추론 서버 (`ai/road-ai`)
```bash
cd ai/road-ai
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# .env 파일에서 DB 접속 정보, ITS_API_KEY, AI_BACKEND_URL 등 입력
# models/ 경로에 Keras · YOLO 가중치 파일을 별도로 배치해야 합니다.
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

### AI 챗봇 서버 (`ai/highway-chatbot-server`)
```bash
cd ai/highway-chatbot-server
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp env.example .env
# .env 파일에서 DB 접속 정보, OPENAI_API_KEY 등 입력
uvicorn main:app --host 0.0.0.0 --port 8002 --reload
```

### 프론트엔드 (`frontend/project-html`)
```bash
cd frontend/project-html
npm install
npm run dev
```

서버 최초 실행 시 SQLAlchemy `create_all`로 테이블이 자동 생성되고, 기본 관리자 계정이 시딩됩니다. (`ADMIN_*` 환경변수 참조)

백엔드 서버 실행 후 `/docs` 경로에서 Swagger UI로 API 명세를 확인할 수 있습니다.

---

## 환경변수

`.env` 파일은 보안상 저장소에 포함되지 않으며, 각 서비스의 `env.example`(`ai/road-ai`는 `.env.example`)을 참고해 로컬에 직접 생성해야 합니다.

**백엔드 (`backend/FastAPI/.env`)**
`DB_MEMBER_*` · `DB_BOARD_*` · `DB_AI_*` · `DB_CHAT_*` — 4개 DB 접속 정보 / `JWT_SECRET_KEY` — JWT 서명 키(최소 32자) / `OPENAI_API_KEY` — AI 관제 어시스턴트 / `ITS_API_KEY` — 고속도로 CCTV 동기화 / `MAIL_*` — Gmail SMTP 이메일 인증 / `NAVER · KAKAO · GOOGLE_*` — 소셜 로그인 OAuth / `ADMIN_*` — 초기 관리자 계정 / `FRONTEND_ORIGIN` — CORS 허용 도메인 / `AI_SERVER_URL` · `AI_API_KEY` — AI 서버 연동

**AI 추론 서버 (`ai/road-ai/.env`)**
`DEBUG` · `KERAS_MODEL_VERSION` · `KERAS_THRESHOLD` — 앱 · 게이트 모델 설정 / `ITS_API_KEY` · `ITS_API_BASE_URL` — ITS CCTV API / `AI_BACKEND_URL` · `AI_SERVER_URL` — 연동 서버 주소 / `AI_API_KEY` — AI 서버 API 인증(비우면 검증 생략) / `DB_HOST` · `DB_PORT` · `DB_USER` · `DB_PASSWORD` · `DB_NAME`(ai_db) — DB 접속 정보

**AI 챗봇 서버 (`ai/highway-chatbot-server/.env`)**
`DB_HOST` · `DB_PORT` · `DB_USER` · `DB_PASSWORD` · `DB_NAME` — MySQL 접속 정보 / `OPENAI_API_KEY` — gpt-4.1-mini 호출 / `CORS_ORIGIN` — 허용 프론트 도메인(기본값 `http://localhost:3000`)

---

## 팀

MBC 아카데미 AI-X 3기 최종 프로젝트 4조로 진행했습니다.

|    이름     |    역할    |         담당 기능          |
|:---------:|:--------:|:----------------------:|
|    노형래    |    **조장**    | DB 설계 · 이중화(HA) · 인프라 총괄 |
|    이지건    |    부조장    | Keras 분류 모델 학습, AI 서버 모델 연동 |
|    임효정    |    -    | YOLO 객체 탐지 모델 학습, 데이터셋 구축 · 라벨링 |
|    김사브리나    |    -    | 프론트엔드, Next.js 대시보드 다수 페이지 구현 |
|    심유경    |    -    | 백엔드, FastAPI 라우터 · 4개 DB 연동 |

---

## 아키텍처

백엔드는 라우터 · 서비스 · 스키마 · 모델 계층을 분리한 구조로 구성했습니다.

- **routers** — HTTP 요청 · 응답 처리, 인증 · 권한 검사
- **services** — 비즈니스 로직(스트리밍 관리, LLM 호출, 통계 집계 등)
- **schemas** — Pydantic 기반 요청 · 응답 유효성 검사
- **models** — SQLAlchemy ORM 엔티티

AI 추론 서버(`ai/road-ai`)는 `api/v1`(엔드포인트) · `modules`(도메인 로직: keras · yolo · its) · `infrastructure`(모델 레지스트리 · 캐시 · 스토리지)로 구성해 추론 로직과 API 계층을 분리했습니다.

`modules/chat`, `modules/llm`과 `api/v1/chat.py`, `api/v1/llm.py`는 코드는 존재하지만 아직 구현되지 않은 스캐폴드이며, 실제 LLM 기능은 백엔드(`chat_service.py`)와 별도의 챗봇 서버(`highway-chatbot-server`)에서 담당합니다.

---

## 시연 자료

프로젝트 시연 · 발표 슬라이드는 프론트엔드에 통합되어 있습니다. (frontend/project-html/app/presentation/, 슬라이드 21장, PPTX 다운로드 지원)

해당 화면은 관리자 계정으로 로그인해야 확인 가능하며, 계정 정보는 팀 내부 공유 문서를 참고하시기 바랍니다.

별도의 시연 영상 및 DB 설계 · 발표 원본 산출물은 팀원 소유 자료로 본 저장소에 포함되어 있지 않습니다.

---

## 라이선스

`backend/FastAPI`, `frontend/project-html` 하위 프로젝트는 각각 Apache License 2.0을 따릅니다. ([backend/FastAPI/LICENSE](backend/FastAPI/LICENSE), [frontend/project-html/LICENSE](frontend/project-html/LICENSE))
