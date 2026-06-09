// ============================================================
// 파일 위치: highway-website/app/page.tsx
// 역할: 챗봇을 실제 페이지에 불러와 화면에 표시
// ============================================================

import Chatbot from "../components/Chatbot";

export default function Page() {
  // 실제 서비스에서는 로그인 시스템에서 가져온 사용자 번호를 사용하세요.
  // 테스트 중에는 chat_sessions.user_no FK 제약 때문에
  // 실제로 존재하는 user_no 값을 적어야 합니다.
  const userNo = 1;

  return (
    <main style={{ padding: 24 }}>
      <h1>고속도로 안내</h1>
      <Chatbot userNo={userNo} />
    </main>
  );
}
