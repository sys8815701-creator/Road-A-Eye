# ROAD A EYE — Front-end (Project_HTML)

고속도로 CCTV AI 위험차량 감지 관제 시스템의 **프론트엔드**입니다.
Front 서버(<FRONT_SERVER_IP> :3000)에서 동작하며, 백엔드 API 서버(<BACK_SERVER_IP> :8000)와 연동합니다.

## 구성

```
Project_HTML/
├── project-html/   ← Next.js 16 메인 애플리케이션
└── rae.txt
```

> 원본 서버에는 Flask 프로토타입(`app.py`)과 `venv/`도 있으나, 빌드 산출물·가상환경·비밀파일은 저장소에서 제외됩니다.

## 기술 스택

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** + CSS Modules
- **next-themes** — 다크/라이트 테마 (`data-theme` 속성)
- **leaflet / react-leaflet** — 위험 구간 지도
- **recharts** — 통계 차트
- **quill** — 게시판 리치 에디터
- **html2canvas + pptxgenjs** — 발표자료 PPTX 내보내기
- **lucide-react** — 아이콘

## 실행

```bash
cd project-html
npm install                 # 의존성 설치 (node_modules 복원)
cp .env.example .env.local  # 환경변수 설정 (API 주소 등)

npm run dev    # 개발 서버 (localhost:3000)
npm run build  # 프로덕션 빌드
npm start      # 프로덕션 실행
npm run lint   # ESLint
```

> 빌드는 `--webpack` 플래그로 동작합니다(package.json scripts 참고).

## 주요 화면 (App Router)

| 경로 | 설명 |
|------|------|
| `/` | 랜딩/히어로 페이지 |
| `/login`, `/register`, `/find-id`, `/find-password` | 인증 |
| `/auth/{google,kakao,naver,callback}` | 소셜 로그인 |
| `/dashboard`, `/main` | 통합 관제 대시보드 |
| `/monitoring/{streams,status,ai-test}` | CCTV 스트림·상태·AI 모델 비교 |
| `/analysis/{stats,heatmap,detections,models}` | 통계·위험 구간 지도·감지 기록·모델 관리 |
| `/board/{notice,faq,qna,bug,resources}` | 게시판 |
| `/admin/{manage,profile}` | 관리자 |
| `/profile/{edit,email,delete}`, `/settings`, `/history` | 회원 |
| `/about/{intro,info}` | 프로젝트 소개 |
| `/presentation` | 발표 슬라이드쇼 |

## 디렉터리 구조

| 폴더 | 역할 |
|------|------|
| `app/` | 페이지·레이아웃 (App Router). `layout.tsx`가 전 페이지를 `<Header>`·`<ChatBot>`로 감쌈 |
| `app/api/` | 라우트 핸들러 — `auth`, `chat`, `proxy`, `ai-proxy`, `webcam` (백엔드 프록시) |
| `components/` | 공통 컴포넌트 — `Header`, `ChatBot`, `ThemeToggle`, `dashboard/`(TopStats·CCTVView·AlertList·LogTable) |
| `context/` | React Context (전역 상태) |
| `lib/` | 유틸리티 |
| `public/` | 정적 자산 — `members/`(팀 이미지), `maps/`(지도), 소셜 아이콘 등 |

## 스타일링

- 컴포넌트별 **CSS Modules**(`*.module.css`) + `app/globals.css`(Tailwind)
- 테마: CSS 커스텀 속성(`--red`, `--bg`, `--text` …)을 `<html data-theme="dark">`로 토글

## ⚠️ 보안 / 제외 항목

이 폴더에는 소스코드만 포함됩니다. 다음은 **의도적으로 제외**되었습니다:
- `.env` / `.env.local` — API 주소·키 등 (절대 커밋 금지)
- `node_modules/` — `npm install`로 복원
- `.next/` — 빌드 산출물 · `venv/`(Flask용) · `*.log` · `tsconfig.tsbuildinfo`
- `public/members/demo.mp4` — **113MB로 GitHub 100MB 제한 초과**. 압축본은 `db/presentation/members/`에 별도 보관됨
