
import styles from './presentation.module.css';

const dataset = [
  ['데이터셋', 'Final Dataset v4 기반 · 고속도로 CCTV 위험 객체 데이터'],
  ['탐지', 'CVAT 라벨링 후 YOLO Format으로 정리한 7개 금지 교통수단'],
  ['분류', 'Keras용 10클래스 데이터로 재구성 · 정상/비금지 객체 포함'],
  ['환경', '원거리·소형 객체, 가림, 야간/우천, 압축 노이즈 반영'],
  ['입력', 'Keras 512px, YOLO 계열 640px 중심 비교'],
];

const criteria = [
  { title: '분류 성능', body: 'Accuracy, Top-2, Recall, F1로 분류 안정성 확인', color: '#10b981' },
  { title: '탐지 성능', body: 'Precision, Recall, mAP50, mAP50-95로 탐지 품질 비교', color: '#2563eb' },
  { title: '운영성', body: '학습 시간, 추론 속도, 서버 자원 사용량까지 함께 판단', color: '#7c3aed' },
];

const roles = [
  ['Keras', '프레임 1차 분류'],
  ['YOLOv8', 'Nano/Small 비교'],
  ['YOLOv11', '최종 탐지 후보'],
  ['Ensemble', '분류+탐지 결합'],
];

export default function Chapter7AiCommon() {
  return (
    <div className={styles.slide}>
      <div className={styles.logo}><img src="/images/logo.png" alt="ROAD A EYE" style={{ height: 40, width: 'auto', display: 'block' }} /></div>
      <div className={styles.teamBadge}>4조</div>
      <div className={styles.contentTop} style={{ height: '100%', padding: '50px 52px 28px' }}>
        <div className={styles.chapterBadge}>Chapter 7</div>
        <h1 className={styles.slideTitle} style={{ marginBottom: 6 }}>AI 모델 공통 실험 기준</h1>
        <div className={styles.slideSubtitle} style={{ marginBottom: 16, color: '#6f8298', fontSize: 17 }}>
          Keras, YOLOv8, YOLOv11을 같은 기준으로 비교하기 위한 정리
        </div>

        <div style={{ width: '100%', flex: 1, display: 'grid', gridTemplateRows: '1fr 174px 56px', gap: 14, minHeight: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, width: '100%', alignItems: 'stretch', minHeight: 0 }}>
            <section style={card('#173a70')}>
              <div style={{ color: '#173a70', fontSize: 21, fontWeight: 950, marginBottom: 10 }}>데이터셋 공통 조건</div>
              <div style={{ display: 'grid', gap: 7 }}>
                {dataset.map(([k, v]) => (
                  <div key={k} style={{ display: 'grid', gridTemplateColumns: '88px 1fr', gap: 9, alignItems: 'center', background: '#f8fbfd', border: '1px solid #e2eaf0', borderRadius: 13, padding: '9px 12px' }}>
                    <div style={{ color: '#173a70', fontSize: 15.5, fontWeight: 950 }}>{k}</div>
                    <div style={{ color: '#334155', fontSize: 14.7, lineHeight: 1.28, fontWeight: 800 }}>{v}</div>
                  </div>
                ))}
              </div>
            </section>

            <section style={{ ...card('#10b981'), padding: '15px 17px' }}>
              <div style={{ color: '#047857', fontSize: 20.5, fontWeight: 950, marginBottom: 8 }}>평가 기준</div>
              <div style={{ display: 'grid', gap: 7 }}>
                {criteria.map((c) => (
                  <div key={c.title} style={{ background: `${c.color}0f`, border: `1px solid ${c.color}30`, borderRadius: 13, padding: '9px 12px' }}>
                    <div style={{ color: c.color, fontSize: 16.5, fontWeight: 950, marginBottom: 3 }}>{c.title}</div>
                    <div style={{ color: '#334155', fontSize: 14.1, lineHeight: 1.26, fontWeight: 770 }}>{c.body}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '8px 11px', color: '#166534', fontSize: 13.3, lineHeight: 1.25, fontWeight: 810 }}>
                공통 목표는 실제 CCTV 관제에서 미탐지를 줄이고 안정적으로 운용 가능한 모델을 선택하는 것입니다.
              </div>
            </section>
          </div>

          <section style={{ width: '100%', margin: '0 auto', background: '#fff', border: '1px solid #e6eef4', borderRadius: 18, padding: '16px 20px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 28px rgba(91, 140, 174, 0.13)' }}>
            <div style={{ color: '#1f2d3d', fontSize: 20, fontWeight: 950, marginBottom: 10 }}>모델별 역할 구분</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, flex: 1 }}>
              {roles.map(([name, body], idx) => {
                const colors = ['#10b981', '#0d9488', '#2563eb', '#7c3aed'];
                const color = colors[idx];
                return <div key={name} style={{ background: `${color}0f`, border: `1px solid ${color}30`, borderRadius: 15, padding: '14px 14px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ color, fontSize: 23, fontWeight: 950, marginBottom: 7 }}>{name}</div>
                  <div style={{ color: '#334155', fontSize: 15.5, lineHeight: 1.3, fontWeight: 800 }}>{body}</div>
                </div>;
              })}
            </div>
          </section>

          <div style={{ width: '100%', margin: '0 auto', background: 'linear-gradient(135deg,#173a70,#2f6f9d)', color: '#fff', borderRadius: 15, padding: '12px 20px', fontSize: 18.5, lineHeight: 1.2, fontWeight: 950, textAlign: 'center' }}>
            핵심 방향: 미탐지를 줄이고, 실시간 관제에 바로 쓰는 AI 구조 완성
          </div>
        </div>
      </div>
      <div className={styles.pageNumber}>13</div>
    </div>
  );
}

function card(color: string) {
  return { background: '#fff', border: '1px solid #e6eef4', borderTop: `7px solid ${color}`, borderRadius: 18, padding: '16px 18px', boxShadow: '0 10px 28px rgba(91, 140, 174, 0.13)', overflow: 'hidden' as const };
}
