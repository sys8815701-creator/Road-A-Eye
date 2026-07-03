import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://<BACK_SERVER_IP>:8000";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const query = req.nextUrl.search;
  const url = `${BACKEND}/${path.join("/")}${query}`;

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.get("cookie") ?? "",
      },
    });
    const text = await res.text();
    let data: unknown;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
    const out = NextResponse.json(data, { status: res.status });
    const setCookie = res.headers.get("set-cookie");
    if (setCookie) out.headers.set("set-cookie", setCookie);
    return out;
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const query = req.nextUrl.search;
  const url = `${BACKEND}/${path.join("/")}${query}`;
  const body = await req.arrayBuffer();
  const contentType = req.headers.get("content-type") ?? "application/json";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": contentType,
        cookie: req.headers.get("cookie") ?? "",
      },
      body: body.byteLength > 0 ? body : undefined,
    });
    const text = await res.text();
    let data: unknown;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
    const out = NextResponse.json(data, { status: res.status });
    const setCookie = res.headers.get("set-cookie");
    if (setCookie) out.headers.set("set-cookie", setCookie);
    return out;
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
