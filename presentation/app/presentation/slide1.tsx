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

      <div className={styles.pageNumber}>1</div>
      <div className={styles.memberInfo}>
        <div style={{ display: 'inline-block', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, marginBottom: 8 }}>
            <span>
              <span className={styles.role} style={{ minWidth: 0 }}>조장</span>
              <span className={styles.name}>노형래</span>
            </span>
            <span>
              <span className={styles.role} style={{ minWidth: 0 }}>부조장</span>
              <span className={styles.name}>이지건</span>
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.role} style={{ minWidth: 0 }}>조원</span>
            <span className={styles.name}>임효정 | 김사브리나 | 심유경</span>
          </div>
        </div>
      </div>
    </div>
  );
}
