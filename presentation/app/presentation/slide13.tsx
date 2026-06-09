import styles from './presentation.module.css';

export default function Chapter7_1() {
  return (
    <div className={styles.slide}>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="ROAD A EYE" style={{ height: 40, width: 'auto', display: 'block' }} />
      </div>
      <div className={styles.teamBadge}>4조</div>

      <div className={styles.contentTop} style={{ padding: '70px 60px 20px' }}>
        <div className={styles.chapterBadge}>Chapter 7</div>
        <h1 className={styles.slideTitle} style={{ marginBottom: 20 }}>AI 1차 학습 결과</h1>

        <div className={styles.gridTwo} style={{ width: '100%', gap: 24 }}>
          {/* 데이터셋 구성 */}
          <div className={styles.card} style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ background: '#2c3e50', color: '#fff', borderRadius: 8, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>1</div>
              <div className={styles.cardTitle} style={{ marginBottom: 0, fontSize: 18 }}>데이터셋 구성</div>
            </div>

            <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'center' }}>
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: 14, color: '#888' }}>전체 데이터</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#2c3e50' }}>6,903<span style={{ fontSize: 16, color: '#5B8CAE', fontWeight: 600 }}>장</span></div>
              </div>
              <table className={styles.table} style={{ fontSize: 14 }}>
                <thead>
                  <tr><th>Train</th><th>Validation</th><th>Test</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>4,470장<br />(64.8%)</td>
                    <td>1,600장<br />(23.2%)</td>
                    <td>833장<br />(12.1%)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.cardTitle} style={{ fontSize: 16, marginBottom: 8 }}>주요 탐지 클래스 (총 10개)</div>
            <p style={{ fontSize: 15, color: '#555', lineHeight: 1.7, margin: 0 }}>
              경운기 · 전동 킥보드 · 굴삭기 · 리어카 · 지게차 · 트랙터 · 전동 휠체어 · 자동차 · 사람 · 오토바이
            </p>
          </div>

          {/* 최종 성능 결과 */}
          <div className={styles.card} style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ background: '#2c3e50', color: '#fff', borderRadius: 8, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>2</div>
              <div className={styles.cardTitle} style={{ marginBottom: 0, fontSize: 18 }}>최종 성능 결과</div>
            </div>

            <table className={styles.table} style={{ marginBottom: 16 }}>
              <thead>
                <tr>
                  <th></th>
                  <th>Precision</th>
                  <th>Recall</th>
                  <th>mAP50</th>
                  <th>mAP50-95</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 700 }}>YOLOv8s</td>
                  <td>0.930</td>
                  <td>0.923</td>
                  <td><strong>0.948</strong></td>
                  <td>0.724</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>Keras</td>
                  <td>0.940</td>
                  <td>0.932</td>
                  <td><strong>0.976</strong></td>
                  <td>1.000</td>
                </tr>
              </tbody>
            </table>

            <div style={{ background: '#f5f8fa', borderRadius: 12, padding: 16 }}>
              <div className={styles.cardTitle} style={{ fontSize: 16, marginBottom: 8 }}>핵심 요약</div>
              <ul className={styles.bulletList}>
                <li>다양한 CCTV 환경 기반 데이터셋 구축</li>
                <li>mAP50 <span className={styles.highlightBlue}>94.8%</span> 달성</li>
                <li>실제 고속도로 환경 적용 가능성 확인</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.pageNumber}>13</div>
    </div>
  );
}
