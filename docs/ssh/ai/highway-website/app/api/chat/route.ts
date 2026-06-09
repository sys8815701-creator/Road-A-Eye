// ============================================================
// 파일 위치: highway-website/app/api/chat/route.ts
// 역할: 브라우저의 요청을 받아 AI 서버(FastAPI)로 전달하는 '중계소'.
//       이 코드는 프론트 서버 안에서만 실행됩니다 (브라우저에 노출 안 됨).
// ============================================================

export async function POST(request: Request) {
  try {
    // (1) 브라우저가 보낸 데이터를 꺼냅니다.
    const body = await request.json();

    // (2) AI 서버 주소를 .env.local에서 읽어옵니다.
    //     NEXT_PUBLIC_ 이 없으므로 이 값은 브라우저에 노출되지 않습니다.
    const aiServerUrl = process.env.AI_SERVER_URL;

    // (3) AI 서버(FastAPI)의 /api/chat 으로 요청을 전달합니다.
    const res = await fetch(`${aiServerUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // (4) AI 서버의 답변을 그대로 브라우저로 돌려줍니다.
    const data = await res.json();
    return Response.json(data);
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: "일시적인 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
