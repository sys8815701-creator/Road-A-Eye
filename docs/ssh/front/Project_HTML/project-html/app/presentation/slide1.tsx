import styles from './presentation.module.css';

export default function Cover() {
  return (
    <div className={styles.slide}>
      <div className={`${styles.circleDecoration} ${styles.circleLg}`} />
      <div className={`${styles.circleDecoration} ${styles.circleSm}`} />
      <div className={styles.dotPattern} />
      <div className={styles.titleSlide}>
        <div className={styles.projectBadge}>FINAL PROJECT TEAM 4</div>
        <div className={styles.mainTitle}>ROAD A EYE</div>
        <div className={styles.mainSubtitle}>
          고속도로 CCTV 기반<br />
          AI 위험 물체 감지 관제 시스템
        </div>
      </div>
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 50,
        background: 'linear-gradient(180deg, #8BA4B8 0%, #5B8CAE 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        zIndex: 10,
      }}>
        <div style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          color: '#fff',
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: 3,
        }}>
          FINAL PROJECT REPORT
        </div>
        <img src="/images/logo.png" alt="ROAD A EYE" style={{ height: 40, width: 'auto', display: 'block', transform: 'rotate(90deg)' }} />
      </div>


      <a
        data-nav="true"
        href="https://borrower-grandpa-implosion.ngrok-free.dev/auth/google/callback"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          left: 86,
          bottom: 66,
          zIndex: 12,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 22px',
          borderRadius: 18,
          background: 'rgba(255,255,255,0.88)',
          border: '1px solid rgba(139,164,184,0.4)',
          color: '#173a70',
          textDecoration: 'none',
          boxShadow: '0 8px 20px rgba(91,140,174,0.16)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <span style={{ width: 9, height: 9, borderRadius: 999, background: '#e11d48', boxShadow: '0 0 0 4px rgba(225,29,72,0.12)', flexShrink: 0 }} />
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2, lineHeight: 1.15 }}>
          <span style={{ fontSize: 18, fontWeight: 900 }}>ROAD A EYE 접속 링크</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#5b7186', letterSpacing: '-0.02em' }}>
            https://borrower-grandpa-implosion.ngrok-free.dev/auth/google/callback
          </span>
        </span>
      </a>

      <div className={styles.pageNumber}>1</div>
      <div className={styles.memberInfo}>
        <div style={{ display: 'inline-block', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, marginBottom: 8 }}>
            <span>
              <span className={styles.role} style={{ minWidth: 0, fontSize: 18 }}>조장</span>
              <span className={styles.name} style={{ fontSize: 22, fontWeight: 800, color: '#1f2d3d' }}>노형래</span>
            </span>
            <span>
              <span className={styles.role} style={{ minWidth: 0, fontSize: 18 }}>부조장</span>
              <span className={styles.name} style={{ fontSize: 22, fontWeight: 800, color: '#1f2d3d' }}>이지건</span>
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.role} style={{ minWidth: 0, fontSize: 18 }}>조원</span>
            <span className={styles.name} style={{ fontSize: 22, fontWeight: 800, color: '#1f2d3d' }}>임효정 | 김사브리나 | 심유경</span>
          </div>
        </div>
      </div>
    </div>
  );
}
