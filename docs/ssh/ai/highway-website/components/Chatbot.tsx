// ============================================================
// 파일 위치: highway-website/components/Chatbot.tsx
// 역할: 방문자가 보는 챗봇 화면.
//       입력을 받아 '/api/chat' 중계소로 보내고 답을 표시.
//       디자인(스타일)은 return ( ... ) 안의 태그에 자유롭게 추가하세요.
// ============================================================

"use client";

import { useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

// userNo: 로그인한 사용자 번호. 이 컴포넌트를 부르는 페이지에서 넘겨줍니다.
export default function Chatbot({ userNo }: { userNo: number }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  // sessionNo: 첫 답변 이후 서버가 정해줍니다. 다음 질문 때 함께 보냅니다.
  const [sessionNo, setSessionNo] = useState<number | null>(null);

  async function send() {
    if (!input.trim() || loading) return;

    const question = input;
    const next: Msg[] = [...messages, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      // 프론트 서버의 중계소(/api/chat)로만 요청합니다.
      // 이전 대화는 AI 서버가 DB에서 직접 불러오므로 여기서는 보내지 않습니다.
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_no: sessionNo,  // 첫 질문이면 null
          user_no: userNo,
          message: question,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages([...next, { role: "assistant", content: data.error }]);
        return;
      }

      setSessionNo(data.session_no);
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } finally {
      setLoading(false);
    }
  }

  // ── 화면 (디자인은 여기에 자유롭게 입히세요) ──────────────────────────
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", fontFamily: "sans-serif" }}>
      {/* 대화 목록 */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 16,
          minHeight: 300,
          marginBottom: 12,
          overflowY: "auto",
        }}
      >
        {messages.length === 0 && (
          <p style={{ color: "#aaa" }}>질문을 입력하세요.</p>
        )}
        {messages.map((m, i) => (
          <p key={i} style={{ textAlign: m.role === "user" ? "right" : "left" }}>
            <strong>{m.role === "user" ? "나" : "챗봇"}:</strong> {m.content}
          </p>
        ))}
        {loading && <p style={{ color: "#aaa" }}>답변 생성 중...</p>}
      </div>

      {/* 입력 영역 */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          style={{ flex: 1, padding: "8px 12px", borderRadius: 6, border: "1px solid #ccc" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="질문을 입력하세요..."
          disabled={loading}
        />
        <button
          style={{ padding: "8px 16px", borderRadius: 6, cursor: loading ? "not-allowed" : "pointer" }}
          onClick={send}
          disabled={loading}
        >
          {loading ? "..." : "전송"}
        </button>
      </div>
    </div>
  );
}
