'use client';
import { useState } from 'react';
import styles from './presentation.module.css';

type Bar = { label: string; value: number };
type Model = {
  key: string;
  badge: string;
  badgeColor: string;
  accent: string;
  cardTitle: string;
  chartTitle: string;
  baseline: number;
  bars: Bar[];
  curveImg: string;
  summary: string[];
  improve: string[];
};

const models: Model[] = [
  {
    key: 'keras', badge: '1', badgeColor: '#e74c3c', accent: '#e74c3c',
    cardTitle: 'Keras 학습 곡선 및 분석',
    chartTitle: 'Keras 분류 성능 (1차)',
    baseline: 85,
    bars: [
      { label: 'Accuracy', value: 94.0 },
      { label: 'Top-2', value: 97.6 },
      { label: 'macro F1', value: 91.0 },
    ],
    curveImg: '/members/keras_curve.png',
    summary: ['학습 곡선 안정성 확인', '주요 클래스 성능 확인', '일부 클래스 혼동 구간 확인'],
    improve: ['경운기-리어카 구분 보강', '굴삭기-지게차 혼동 개선', '사람-전동 휠보드 오분류 보완'],
  },
  {
    key: 'yolo', badge: '2', badgeColor: '#3498db', accent: '#3498db',
    cardTitle: 'YOLOv8 학습 곡선 및 분석',
    chartTitle: 'YOLOv8 탐지 성능 (1차)',
    baseline: 60,
    bars: [
      { label: 'Precision', value: 93.0 },
      { label: 'Recall', value: 92.3 },
      { label: 'mAP50', value: 94.8 },
      { label: 'mAP50-95', value: 72.4 },
    ],
    curveImg: '/members/yolo_curve.png',
    summary: ['대부분 클래스에서 높은 탐지 정확도', 'car / person / motorcycle 우수 성능', 'mAP50 기준 우수한 성능'],
    improve: ['작은 객체 추가 데이터 보강', '야간 / 안개 환경 데이터 확대', '가려짐 및 Occlusion 데이터 보강'],
  },
];

export default function Chapter7_2() {
  const [open, setOpen] = useState<string | null>(null);
  const active = models.find((m) => m.key === open) || null;

  return (
    <div className={styles.slide}>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="ROAD A EYE" style={{ height: 40, width: 'auto', display: 'block' }} />
      </div>
      <div className={styles.teamBadge}>4조</div>

      <div className={styles.contentTop} style={{ padding: '70px 60px 20px' }}>
        <div className={styles.chapterBadge}>Chapter 7</div>
        <h1 className={styles.slideTitle} style={{ marginBottom: 20 }}>학습 곡선 및 분석</h1>

        <div className={styles.gridTwo} style={{ width: '100%', gap: 24 }}>
          {models.map((m) => (
            <div key={m.key} className={styles.card} style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ background: m.badgeColor, color: '#fff', borderRadius: 8, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{m.badge}</div>
                <div className={styles.cardTitle} style={{ marginBottom: 0, fontSize: 17 }}>{m.cardTitle}</div>
              </div>

              {/* 그래프 보기 버튼 */}
              <button
                data-nav="true"
                onClick={(e) => { e.stopPropagation(); setOpen(m.key); }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${m.accent}1c`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = `${m.accent}10`; }}
                style={{
                  width: '100%', height: 96, marginBottom: 14,
                  background: `${m.accent}10`, border: `1.5px dashed ${m.accent}66`, borderRadius: 12,
                  color: m.accent, fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
              >
                <span style={{ fontSize: 26, lineHeight: 1 }}>📊</span>
                그래프 보기
              </button>

              <div className={styles.cardTitle} style={{ fontSize: 15, marginBottom: 6 }}>분석 요약</div>
              <ul className={styles.bulletList}>
                {m.summary.map((s) => (<li key={s} style={{ fontSize: 14, marginBottom: 4 }}>{s}</li>))}
              </ul>

              <div className={styles.cardTitle} style={{ fontSize: 15, marginBottom: 6, marginTop: 8 }}>개선 방향</div>
              <ul className={styles.bulletList}>
                {m.improve.map((s) => (<li key={s} style={{ fontSize: 14, marginBottom: 4 }}>{s}</li>))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.pageNumber}>14</div>

      {/* ===== 그래프 모달 ===== */}
      {active && (
        <div
          data-nav="true"
          onClick={(e) => { e.stopPropagation(); setOpen(null); }}
          style={{
            position: 'absolute', inset: 0, zIndex: 100,
            background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(3px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 860, background: '#fff', borderRadius: 20, overflow: 'hidden',
              display: 'flex', flexDirection: 'column', boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
            }}
          >
            {/* 헤더 */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '20px 28px', borderBottom: `3px solid ${active.accent}`,
              background: `linear-gradient(90deg, #fff 0%, ${active.accent}14 100%)`,
            }}>
              <span style={{ fontSize: 24 }}>📊</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#1f2d3d' }}>{active.chartTitle}</span>
              <button
                onClick={(e) => { e.stopPropagation(); setOpen(null); }}
                style={{
                  marginLeft: 'auto', width: 40, height: 40, borderRadius: '50%',
                  border: '1px solid #e2e8f0', background: '#fff', color: '#64748b',
                  fontSize: 22, lineHeight: 1, cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit', flexShrink: 0,
                }}
                aria-label="닫기"
              >×</button>
            </div>

            {/* 본문 — 막대 그래프 */}
            <div style={{ padding: '32px 40px 36px' }}>
              <div style={{
                height: 280, display: 'flex', alignItems: 'end', gap: 40, padding: '20px 30px 0',
                borderBottom: '2px solid #cdd7e0',
                background: 'linear-gradient(to top, #eef3f7 1px, transparent 1px)', backgroundSize: '100% 46px',
              }}>
                {active.bars.map((b) => {
                  const h = Math.max(40, ((b.value - active.baseline) / (100 - active.baseline)) * 230);
                  return (
                    <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'end', height: '100%' }}>
                      <div style={{
                        width: 70, height: h, borderRadius: '8px 8px 0 0',
                        background: `linear-gradient(180deg, ${active.accent} 0%, ${active.accent}cc 100%)`,
                        position: 'relative', boxShadow: `0 4px 14px ${active.accent}55`,
                      }}>
                        <span style={{ position: 'absolute', top: -26, left: 0, right: 0, textAlign: 'center', fontSize: 16, fontWeight: 800, color: '#1f2d3d' }}>{b.value.toFixed(1)}</span>
                      </div>
                      <div style={{ marginTop: 12, fontSize: 15, fontWeight: 700, color: '#46586a' }}>{b.label}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{
                marginTop: 22, fontSize: 14, color: '#7a8896', textAlign: 'center',
                background: '#f7fafc', border: '1px solid #eef2f6', borderRadius: 10, padding: '10px 14px',
              }}>
                단위 (%) · 막대는 {active.baseline}%~100% 구간을 확대해 표시 · 학습 곡선 이미지는 추후 추가 예정
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
