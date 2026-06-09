import styles from './presentation.module.css';

type Phase = {
  badge: string;
  accent: string;
  icon: string;
  title: string;
  desc: string;
};

const phases: Phase[] = [
  {
    badge: '단기 계획', accent: '#0ea5e9', icon: '⚡',
    title: 'Ollama Local LLM을 활용한 LangChain',
    desc: '로컬에서 LLM을 구동하여 오탐률을 줄이고 성능 향상',
  },
  {
    badge: '중기 계획', accent: '#6366f1', icon: '🎯',
    title: 'Fine-tuning을 활용한 Local LLM LangChain',
    desc: '축적된 탐지 데이터를 활용하여 Road A Eye 모델 고도화',
  },
  {
    badge: '장기 계획', accent: '#7c3aed', icon: '🛣️',
    title: '차선 구분을 통한 위험도 관리',
    desc: '차선 기반 위치 분석을 통한 실시간 위험도 관리',
  },
];

export default function Chapter9_1() {
  return (
    <div className={styles.slide}>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="ROAD A EYE" style={{ height: 40, width: 'auto', display: 'block' }} />
      </div>
      <div className={styles.teamBadge}>4조</div>

      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '70px 60px 56px', boxSizing: 'border-box', alignItems: 'center' }}>
        <div className={styles.chapterBadge}>Chapter 9</div>
        <h1 className={styles.slideTitle} style={{ marginBottom: 30 }}>향후 확장 계획</h1>

        {/* 단계 카드 — 남은 세로 공간을 채움 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, width: '100%', flex: 1, minHeight: 0 }}>
          {phases.map((p, i) => (
            <div key={p.badge} style={{
              position: 'relative',
              background: '#ffffff',
              borderRadius: 18,
              border: '1px solid #e6eef4',
              boxShadow: '0 8px 24px rgba(91,140,174,0.16)',
              padding: '30px 26px 28px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: p.accent }} />

              {/* 단계 번호 워터마크 */}
              <span style={{
                position: 'absolute', top: 10, right: 18,
                fontSize: 96, fontWeight: 900, lineHeight: 1,
                color: `${p.accent}12`, letterSpacing: '-3px', pointerEvents: 'none',
              }}>{i + 1}</span>

              {/* 단계 배지 */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start',
                background: `${p.accent}14`, border: `1px solid ${p.accent}33`, color: p.accent,
                padding: '6px 16px', borderRadius: 20, fontSize: 15, fontWeight: 800,
              }}>{p.badge}</div>

              {/* 아이콘 */}
              <div style={{
                width: 64, height: 64, borderRadius: 18, marginTop: 26,
                background: `${p.accent}14`, border: `1px solid ${p.accent}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34,
              }}>{p.icon}</div>

              {/* 제목 */}
              <div style={{
                marginTop: 22, fontSize: 21, fontWeight: 800, color: '#1f2d3d',
                lineHeight: 1.4, letterSpacing: '-0.3px',
              }}>{p.title}</div>

              {/* 설명 — 카드 하단에 고정 */}
              <div style={{
                marginTop: 'auto', paddingTop: 18, borderTop: '1px solid #eef2f6',
                fontSize: 15.5, color: '#5b6b7a', lineHeight: 1.6,
              }}>{p.desc}</div>
            </div>
          ))}
        </div>

        {/* 결론 배너 */}
        <div style={{
          marginTop: 26, width: '100%', flexShrink: 0,
          background: 'linear-gradient(90deg, #5B8CAE12 0%, #6366f112 100%)',
          border: '1px solid #dde7f0', borderRadius: 16,
          padding: '22px 28px', textAlign: 'center',
          boxShadow: '0 6px 20px rgba(91,140,174,0.10)',
        }}>
          <p style={{ margin: 0, fontSize: 17, color: '#46586a', lineHeight: 1.7 }}>
            자체 AI 고도화를 통해 오탐을 줄이고,
            도메인에 특화된 <span className={styles.highlightBlue}>예측형 관제 시스템</span>으로 진화
          </p>
        </div>
      </div>
      <div className={styles.pageNumber}>18</div>
    </div>
  );
}
