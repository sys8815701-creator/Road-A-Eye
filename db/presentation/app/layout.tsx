export const metadata = {
  title: 'ROAD A EYE - 3주차 중간 보고',
  description: '고속도로 CCTV 기반 AI 위험 물체 감지 관제 시스템',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
