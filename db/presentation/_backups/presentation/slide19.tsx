import styles from './presentation.module.css';

export default function Chapter9_Ending() {
  return (
    <div className={styles.slide} style={{ background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #1a1a2e 100%)' }}>
      <div className={styles.content} style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 36, fontWeight: 900 }}>
            <span style={{ color: '#c0392b' }}>Road A Eye</span>
          </span>
        </div>
        <div className={styles.endingText}>
          실시간 감지에서 예측 기반 예방까지
        </div>
        <div className={styles.endingSubtext}>
          AI가 지키는 더 안전한 고속도로
        </div>
      </div>
    </div>
  );
}
