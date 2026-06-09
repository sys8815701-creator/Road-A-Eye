import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "고속도로 안내",
  description: "고속도로 안내 챗봇",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
