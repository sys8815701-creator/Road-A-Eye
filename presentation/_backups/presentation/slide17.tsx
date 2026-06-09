// Chapter 8 - 시연 영상
import styles from './presentation.module.css';

const ACCENT = '#0ea5e9';

const features = [
  { label: '실시간 객체 탐지', accent: '#0ea5e9' },
  { label: 'WebSocket 알림', accent: '#6366f1' },
  { label: '대시보드 연동', accent: '#0d9488' },
  { label: '감지 기록 저장', accent: '#7c3aed' },
];

export default function Chapter8() {
  return (
    <div className={styles.slide}>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="ROAD A EYE" style={{ height: 40, width: 'auto', display: 'block' }} />
      </div>
      <div className={styles.teamBadge}>4조</div>

      <div className={styles.content}>
        <div className={styles.chapterBadge}>Chapter 8</div>
        <h1 className={styles.slideTitle} style={{ marginBottom: 22 }}>시연 영상</h1>

        {/* 영상 프레임 카드 — 내부 미디어 요소는 그대로 보존 */}
        <div style={{
          position: 'relative',
          padding: 12,
          background: '#fff',
          borderRadius: 20,
          border: '1px solid #e6eef4',
          boxShadow: '0 18px 44px rgba(91,140,174,0.22)',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: ACCENT, zIndex: 2 }} />

          {/* 브라우저 크롬 바 */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 6px 12px', borderBottom: '1px solid #eef2f6', marginBottom: 12,
          }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
            <span style={{
              marginLeft: 12, padding: '4px 14px', borderRadius: 8,
              background: '#f0f5f9', border: '1px solid #e1e9f0',
              fontSize: 12.5, fontWeight: 600, color: '#7a8896', letterSpacing: '0.2px',
            }}>
              roadeye · 실시간 관제 대시보드
            </span>
            <span style={{
              marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 12px', borderRadius: 20,
              background: '#dc262614', border: '1px solid #dc262633', color: '#dc2626',
              fontSize: 12, fontWeight: 800,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#dc2626' }} /> LIVE
            </span>
          </div>

          {/* 영상 또는 스크린샷 삽입 영역 — 절대 변형 금지 */}
          <div style={{
            width: 1000,
            height: 440,
            background: '#2c3e50',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* 시연 영상 — 자동재생 X, 컨트롤바로 재생, 종료 시 정지(반복 없음) */}
            <video
              src="/members/demo.mp4"
              controls
              playsInline
              preload="metadata"
              style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
            />
          </div>
        </div>

        <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
          {features.map((f) => (
            <div key={f.label} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: `${f.accent}14`, border: `1px solid ${f.accent}33`, color: f.accent,
              padding: '7px 16px', borderRadius: 20, fontSize: 14, fontWeight: 800,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: f.accent }} />
              {f.label}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.pageNumber}>17</div>
    </div>
  );
}
