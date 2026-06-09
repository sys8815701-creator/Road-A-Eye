'use client';
// Chapter 8 - 시연 영상
import styles from './presentation.module.css';

const ACCENT = '#0ea5e9';

const features = [
  { icon: '🎯', label: '실시간 객체 탐지', desc: 'YOLOv11 + YOLOv8 앙상블', accent: '#0ea5e9' },
  { icon: '🔔', label: 'WebSocket 알림',   desc: '감지 즉시 관리자 푸시',   accent: '#6366f1' },
  { icon: '📊', label: '대시보드 연동',     desc: '통계 · 히트맵 실시간',    accent: '#0d9488' },
  { icon: '💾', label: '감지 기록 저장',    desc: 'DB 자동 적재 · 이력 조회', accent: '#7c3aed' },
];

export default function Chapter8() {
  return (
    <div className={styles.slide}>
      <style>{`
        @keyframes livePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
        @keyframes liveRing  { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(2.4);opacity:0} }
      `}</style>

      <div className={styles.logo}>
        <img src="/images/logo.png" alt="ROAD A EYE" style={{ height: 40, width: 'auto', display: 'block' }} />
      </div>
      <div className={styles.teamBadge}>4조</div>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        height: '100%', padding: '62px 50px 24px', boxSizing: 'border-box',
      }}>

        {/* 챕터 + 제목 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
          <div className={styles.chapterBadge} style={{ marginBottom: 8 }}>Chapter 8</div>
          <h1 className={styles.slideTitle} style={{ margin: 0, fontSize: 38 }}>시연 영상</h1>
        </div>

        {/* 브라우저 카드 — flex:1 로 남은 공간 전부 차지 */}
        <div
          data-nav="true"
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={(e) => e.stopPropagation()}
          style={{
            width: '100%', flex: '1 1 0', minHeight: 0,
            background: '#fff',
            borderRadius: 18,
            border: '1px solid #e6eef4',
            boxShadow: '0 12px 36px rgba(91,140,174,0.18)',
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* 상단 컬러 바 */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 5,
            background: `linear-gradient(90deg, ${ACCENT}, #6366f1)`,
          }} />

          {/* 브라우저 크롬 바 */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '14px 18px 10px',
            borderBottom: '1px solid #eef2f7',
            background: '#f8fafc', flexShrink: 0,
          }}>
            <div style={{ display: 'flex', gap: 7 }}>
              {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{
              flex: 1, maxWidth: 440, marginLeft: 10,
              display: 'flex', alignItems: 'center', gap: 7,
              background: '#fff', border: '1px solid #dde6ef',
              borderRadius: 8, padding: '5px 13px',
            }}>
              <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 800 }}>🔒</span>
              <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>
                192.168.0.248:3000
                <span style={{ color: '#1e40af', fontWeight: 800 }}>/dashboard</span>
              </span>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                padding: '4px 12px', borderRadius: 8,
                background: '#f0f5f9', border: '1px solid #dde6ef',
                fontSize: 12.5, fontWeight: 700, color: '#5B8CAE',
              }}>ROAD A EYE 관제 시스템</span>
              {/* LIVE 배지 */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 13px', borderRadius: 20,
                background: '#fef2f2', border: '1px solid #fecaca',
              }}>
                <span style={{ position: 'relative', width: 9, height: 9, display: 'inline-block' }}>
                  <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#ef4444', animation: 'liveRing 1.4s ease-out infinite' }} />
                  <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#dc2626', animation: 'livePulse 1.4s ease-in-out infinite' }} />
                </span>
                <span style={{ fontSize: 12, fontWeight: 900, color: '#dc2626', letterSpacing: '1px' }}>LIVE</span>
              </div>
            </div>
          </div>

          {/* 영상 */}
          <div
            data-nav="true"
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
            style={{ flex: '1 1 0', minHeight: 0, background: '#000', position: 'relative' }}
          >
            <video
              data-nav="true"
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={(e) => e.stopPropagation()}
              src="/members/demo.mp4"
              controls
              playsInline
              preload="metadata"
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            />
          </div>
        </div>

        {/* 피처 카드 */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10,
          width: '100%', marginTop: 12, flexShrink: 0,
        }}>
          {features.map((f) => (
            <div key={f.label} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: '#fff', borderRadius: 12,
              border: `1px solid ${f.accent}33`,
              boxShadow: `0 4px 12px ${f.accent}12`,
              padding: '10px 14px',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                background: `${f.accent}14`, border: `1px solid ${f.accent}28`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
              }}>{f.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 900, color: f.accent, lineHeight: 1.2 }}>{f.label}</div>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: '#64748b', marginTop: 2 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.pageNumber}>17</div>
    </div>
  );
}
