import styles from './presentation.module.css';

export default function Chapter7_4() {
  const yoloMetrics = [
    { label: 'mAP50', first: 99.15, second: 98.6 },
    { label: 'mAP50-95', first: 83.88, second: 82.1 },
    { label: 'Precision', first: 98.4, second: 97.5 },
    { label: 'Recall', first: 98.1, second: 94.8 },
  ];

  return (
    <div className={styles.slide}>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="ROAD A EYE" style={{ height: 40, width: 'auto', display: 'block' }} />
      </div>
      <div className={styles.teamBadge}>4조</div>

      <div className={styles.contentTop} style={{ padding: '62px 48px 18px' }}>
        <div className={styles.chapterBadge}>Chapter 7 · 8</div>
        <h1 className={styles.slideTitle} style={{ marginBottom: 24, color: '#173a70' }}>YOLOv11m 1차 · 2차 학습 통합 요약</h1>
        <div className={styles.gridThree} style={{ width: '100%', gap: 22, padding: '0 0' }}>
          <div className={styles.card} style={{ padding: 22, borderRadius: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ background: '#173a70', color: '#fff', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>1</div>
              <div className={styles.cardTitle} style={{ marginBottom: 0 }}>1차 학습 기준</div>
            </div>
            <table className={styles.table} style={{ fontSize: 14, marginBottom: 42 }}>
              <thead><tr><th>지표</th><th>값</th></tr></thead>
              <tbody>
                <tr><td><strong>Best mAP50</strong></td><td>99.15% (Ep.87)</td></tr>
                <tr><td><strong>Best mAP50-95</strong></td><td>83.88% (Ep.92)</td></tr>
                <tr><td><strong>Precision</strong></td><td>98.4%</td></tr>
                <tr><td><strong>Recall</strong></td><td>98.1%</td></tr>
              </tbody>
            </table>
            <div className={styles.cardTitle} style={{ fontSize: 17 }}>진행 요약</div>
            <ul className={styles.bulletList}>
              <li style={{ fontSize: 15 }}>COCO 사전학습 → 파인튜닝</li>
              <li style={{ fontSize: 15 }}>Epoch 100 / Batch 8 / 640px</li>
              <li style={{ fontSize: 15, marginBottom: 0 }}>총 학습 약 102분, 과적합 없음</li>
            </ul>
          </div>
          <div className={styles.card} style={{ padding: 22, borderRadius: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ background: '#173a70', color: '#fff', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>2</div>
              <div className={styles.cardTitle} style={{ marginBottom: 0 }}>2차 설정 변화</div>
            </div>
            <table className={styles.table} style={{ fontSize: 14, marginBottom: 12 }}>
              <thead><tr><th>항목</th><th>1차</th><th>→ 2차</th></tr></thead>
              <tbody>
                <tr><td><strong>Image Size</strong></td><td>640</td><td><strong>832</strong></td></tr>
                <tr><td><strong>box_loss</strong></td><td>7.5</td><td><strong>10.0</strong></td></tr>
                <tr><td><strong>mixup</strong></td><td>0.0</td><td><strong>0.15</strong></td></tr>
                <tr><td><strong>copy_paste</strong></td><td>0.0</td><td><strong>0.3</strong></td></tr>
                <tr><td><strong>학습 시간</strong></td><td>103분</td><td><strong>1,054분</strong></td></tr>
              </tbody>
            </table>
            <div className={styles.cardTitle} style={{ fontSize: 17, marginBottom: 10 }}>핵심 목표</div>
            <ul className={styles.bulletList}>
              <li style={{ fontSize: 15 }}>고해상도·증강으로 정밀도 향상</li>
              <li style={{ fontSize: 15, marginBottom: 0 }}>파인튜닝으로 도메인 적용 강화</li>
            </ul>
          </div>
          <div className={styles.card} style={{ padding: 22, borderRadius: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ background: '#173a70', color: '#fff', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>3</div>
              <div className={styles.cardTitle} style={{ marginBottom: 0 }}>결과 비교 및 판단</div>
            </div>
            <div style={{ height: 202, display: 'flex', alignItems: 'end', gap: 18, padding: '8px 18px 0', borderBottom: '2px solid #999', background: 'linear-gradient(to top, #e3ebf2 1px, transparent 1px)', backgroundSize: '100% 32px' }}>
              {yoloMetrics.map((m) => (
                <div key={m.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'end', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'end', gap: 6, height: 150 }}>
                    <div style={{ width: 24, height: `${(m.first - 78) * 6}px`, minHeight: 30, background: '#4b80bd' }} />
                    <div style={{ width: 24, height: `${(m.second - 78) * 6}px`, minHeight: 30, background: '#e87070' }} />
                  </div>
                  <div style={{ marginTop: 10, fontSize: 13, transform: 'rotate(-42deg)', height: 36, color: '#6f8298' }}>{m.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 4, fontSize: 12 }}>
              <span><i style={{ display: 'inline-block', width: 10, height: 10, background: '#4b80bd', marginRight: 4 }} />1차</span>
              <span><i style={{ display: 'inline-block', width: 10, height: 10, background: '#e87070', marginRight: 4 }} />2차</span>
            </div>
            <div className={styles.cardTitle} style={{ fontSize: 17, marginTop: 18, marginBottom: 10 }}>판단 결과</div>
            <ul className={styles.bulletList}>
              <li style={{ fontSize: 15 }}>전 지표 소폭 하락 → v1 유지 권장</li>
              <li style={{ fontSize: 15 }}>원인: 이미지 급확대 + box_loss 과다</li>
              <li style={{ fontSize: 15, marginBottom: 0 }}>3차: 가중치 원복 + 단계적 확대</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.pageNumber}>16</div>
    </div>
  );
}
