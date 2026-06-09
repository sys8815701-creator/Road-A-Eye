import styles from './presentation.module.css';

export default function Chapter7_3() {
  const metrics = [
    { label: 'Accuracy', first: 94.0, second: 98.1 },
    { label: 'Top-2', first: 97.6, second: 99.0 },
    { label: 'macro F1', first: 91.0, second: 98.0 },
  ];

  return (
    <div className={styles.slide}>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="ROAD A EYE" style={{ height: 40, width: 'auto', display: 'block' }} />
      </div>
      <div className={styles.teamBadge}>4조</div>

      <div className={styles.contentTop} style={{ padding: '62px 70px 20px' }}>
        <div className={styles.chapterBadge}>Chapter 7</div>
        <h1 className={styles.slideTitle} style={{ marginBottom: 8 }}>Keras 1차 vs 2차 학습 결과 비교</h1>
        <div className={styles.slideSubtitle} style={{ marginBottom: 24 }}>
          정확도 향상 + 클래스별 약점 보완 + CCTV 환경 대응 강화
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 24, width: '100%', padding: '0 20px' }}>
          <div className={styles.card} style={{ padding: 26, borderRadius: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ background: '#2c3e50', color: '#fff', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>1</div>
              <div className={styles.cardTitle} style={{ marginBottom: 0 }}>핵심 성능 변화</div>
            </div>
            <div style={{ height: 250, display: 'flex', alignItems: 'end', gap: 46, padding: '10px 30px 0', borderBottom: '2px solid #1a1a1a', background: 'linear-gradient(to top, #e8eef3 1px, transparent 1px)', backgroundSize: '100% 40px' }}>
              {metrics.map((m) => (
                <div key={m.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'end', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'end', gap: 10, height: 190 }}>
                    <div style={{ width: 48, height: `${(m.first - 85) * 12}px`, minHeight: 40, background: '#9fb7c8', position: 'relative' }}>
                      <span style={{ position: 'absolute', top: -22, left: 0, right: 0, textAlign: 'center', fontSize: 11, fontWeight: 700 }}>{m.first.toFixed(1)}</span>
                    </div>
                    <div style={{ width: 48, height: `${(m.second - 85) * 12}px`, minHeight: 40, background: '#6f9db5', position: 'relative' }}>
                      <span style={{ position: 'absolute', top: -22, left: 0, right: 0, textAlign: 'center', fontSize: 11, fontWeight: 700 }}>{m.second.toFixed(1)}</span>
                    </div>
                  </div>
                  <div style={{ marginTop: 12, fontSize: 14 }}>{m.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 18, marginTop: 10, marginLeft: 70, fontSize: 14 }}>
              <span><i style={{ display: 'inline-block', width: 22, height: 10, background: '#9fb7c8', marginRight: 6 }} />1차</span>
              <span><i style={{ display: 'inline-block', width: 22, height: 10, background: '#6f9db5', marginRight: 6 }} />2차</span>
            </div>
            <div style={{ marginTop: 28, background: '#e4f1f7', borderRadius: 14, padding: 18, fontSize: 18, fontWeight: 800, color: '#2c3e50', textAlign: 'center' }}>
              핵심 결론&nbsp; 정확도 +4.12%p, macro F1 +0.07 상승 / 금지차량 탐지율 100% 유지
            </div>
          </div>

          <div style={{ display: 'grid', gap: 22 }}>
            <div className={styles.card} style={{ padding: 26, borderRadius: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#2c3e50', color: '#fff', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>2</div>
                <div className={styles.cardTitle} style={{ marginBottom: 0 }}>최종 성능 요약</div>
              </div>
              <table className={styles.table} style={{ fontSize: 14 }}>
                <thead><tr><th>지표</th><th>1차</th><th>2차</th><th>변화</th></tr></thead>
                <tbody>
                  <tr><td>Accuracy</td><td>93.98%</td><td><strong>98.10%</strong></td><td><strong>+4.12%p</strong></td></tr>
                  <tr><td>Top-2</td><td>97.59%</td><td><strong>99.05%</strong></td><td><strong>+1.46%p</strong></td></tr>
                  <tr><td>macro F1</td><td>0.91</td><td><strong>0.98</strong></td><td><strong>+0.07</strong></td></tr>
                  <tr><td>금지차량 Recall</td><td>100%</td><td><strong>100%</strong></td><td><strong>유지</strong></td></tr>
                </tbody>
              </table>
            </div>
            <div className={styles.card} style={{ padding: 26, borderRadius: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{ background: '#2c3e50', color: '#fff', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>3</div>
                <div className={styles.cardTitle} style={{ marginBottom: 0 }}>2차 학습 개선 방향</div>
              </div>
              <ul className={styles.bulletList}>
                <li style={{ fontSize: 15 }}><strong>Batch Size 32 → 16</strong> &nbsp;|&nbsp; 일반화 성능 강화</li>
                <li style={{ fontSize: 15 }}><strong>Dense(128) L2(0.001)</strong> &nbsp;|&nbsp; 과적합 억제</li>
                <li style={{ fontSize: 15 }}><strong>GaussianNoise(0.05)</strong> &nbsp;|&nbsp; CCTV 압축 노이즈 대응</li>
                <li style={{ fontSize: 15, marginBottom: 0 }}><strong>밝기·대비 0.25 → 0.35</strong> &nbsp;|&nbsp; 야간·역광·흐림 환경 보완</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.pageNumber}>15</div>
    </div>
  );
}
