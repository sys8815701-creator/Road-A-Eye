
import styles from './presentation.module.css';

type Server = {
  icon: string;
  accent: string;
  vip?: string;
  name: string;
  ip: string;
  role?: string;
  dbs: string[];
  note?: string;
};

const servers: Server[] = [
  {
    icon: '🤖', accent: '#7c3aed', vip: 'VIP <AI_DB_VIP>', name: 'AI 서버', ip: '<AI_SERVER_IP>',
    role: 'PRIMARY (MASTER)', dbs: ['ai_db (server-id=1)'],
  },
  {
    icon: '⚙️', accent: '#0d9488', vip: 'VIP <SHARED_DB_VIP>', name: 'Back-end 서버', ip: '<BACK_SERVER_IP>',
    role: 'PRIMARY (MASTER)', dbs: ['member_db (server-id=2)', 'board_db', 'chat_db'],
  },
  {
    icon: '</>', accent: '#6366f1', name: 'Front-end 서버', ip: '<FRONT_SERVER_IP>',
    dbs: [], note: 'JWT API 호출 · DB 직접 접속 불필요',
  },
];

const channels = [
  { db: 'ai_db', ch: 'ai-server', owner: 'AI 서버 전용 DB' },
  { db: 'member_db', ch: 'backend-server', owner: '회원/권한 데이터' },
  { db: 'board_db', ch: 'backend-server', owner: '게시판 데이터' },
  { db: 'chat_db', ch: 'backend-server', owner: '챗봇 대화 이력' },
];

const dbChip = { background: '#e9f7ef', color: '#1e7e44', border: '1px solid #c7ead4' } as const;
const card = {
  position: 'relative' as const,
  background: '#fff',
  borderRadius: 16,
  border: '1px solid #e6eef4',
  boxShadow: '0 6px 20px rgba(91,140,174,0.14)',
  overflow: 'hidden' as const,
};

export default function Chapter6_3() {
  return (
    <div className={styles.slide}>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="ROAD A EYE" style={{ height: 40, width: 'auto', display: 'block' }} />
      </div>
      <div className={styles.teamBadge}>4조</div>

      <div className={styles.contentTop} style={{ height: '100%', padding: '52px 50px 16px' }}>
        <div className={styles.chapterBadge} style={{ marginBottom: 6 }}>Chapter 5</div>
        <h1 className={styles.slideTitle} style={{ marginBottom: 10 }}>DB 이중화</h1>

        <div style={{ width: '100%', padding: '0 28px', boxSizing: 'border-box', flex: 1, display: 'grid', gridTemplateRows: '225px 48px 1fr', gap: 12, minHeight: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, minHeight: 0 }}>
            {servers.map((s) => (
              <div key={s.name} style={{
                ...card,
                padding: '17px 18px 15px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: s.accent }} />

                <div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
                  {s.vip ? (
                    <span style={{
                      background: `${s.accent}14`, border: `1px solid ${s.accent}33`, color: s.accent,
                      fontSize: 12.8, fontWeight: 900, padding: '4px 13px', borderRadius: 15, whiteSpace: 'nowrap',
                    }}>{s.vip}</span>
                  ) : (
                    <span style={{ color: '#94a3b8', fontSize: 13, fontWeight: 800 }}>Application Server</span>
                  )}
                </div>

                <div style={{
                  width: 54, height: 54, borderRadius: 13,
                  background: `${s.accent}14`, border: `1px solid ${s.accent}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: s.icon === '</>' ? 23 : 30, fontWeight: 900, color: s.accent,
                }}>{s.icon}</div>

                <div style={{ fontSize: 21, fontWeight: 900, color: '#1f2d3d', letterSpacing: '-0.3px' }}>{s.name}</div>
                <div style={{ fontSize: 15.2, color: '#1f2d3d', fontWeight: 850, fontFamily: 'monospace' }}>{s.ip}</div>

                {s.role ? (
                  <span style={{ background: s.accent, color: '#fff', fontSize: 13.8, fontWeight: 900, padding: '6px 15px', borderRadius: 14 }}>{s.role}</span>
                ) : (
                  <span style={{ background: '#fef3e7', color: '#c2670a', border: '1px solid #f6dcb8', fontSize: 13.8, fontWeight: 850, padding: '6px 14px', borderRadius: 14 }}>DB 직접 접속 없음</span>
                )}

                {s.dbs.length > 0 ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center', marginTop: 2 }}>
                    {s.dbs.map((d) => (
                      <span key={d} style={{ ...dbChip, fontSize: 13.2, fontWeight: 850, padding: '5px 11px', borderRadius: 8 }}>{d}</span>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: 14.2, color: '#64748b', fontWeight: 750, textAlign: 'center', marginTop: 2 }}>{s.note}</div>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: '72%', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              background: '#fff7ed', border: '1px solid #fed7aa', color: '#c2410c',
              fontSize: 18, fontWeight: 900, borderRadius: 28, boxShadow: '0 6px 18px rgba(194, 65, 12, 0.10)',
            }}>
              <span style={{ fontSize: 20 }}>↕</span>
              <span>양방향 Master-Master Replication</span>
              <span style={{ fontSize: 13.5, color: '#d97706', background: '#ffffff', border: '1px solid #fed7aa', padding: '3px 10px', borderRadius: 14 }}>binlog</span>
              <span style={{ fontSize: 20 }}>↕</span>
            </div>
          </div>

          <div style={{ ...card, padding: '20px 24px 20px', display: 'grid', gridTemplateRows: '1fr 58px', gap: 14, minHeight: 0 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: '#dc2626' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1.45fr', gap: 18, alignItems: 'stretch', minHeight: 0 }}>
              <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 14, padding: '20px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: 42, marginBottom: 10 }}>🗄️</div>
                <div style={{ fontSize: 31, fontWeight: 950, color: '#1f2d3d', marginBottom: 7 }}>DB 백업 서버</div>
                <div style={{ fontSize: 22, color: '#1f2d3d', fontWeight: 900, fontFamily: 'monospace', marginBottom: 8 }}><DB_SERVER_IP></div>
                <div style={{ background: '#dc2626', color: '#fff', fontSize: 18, fontWeight: 950, padding: '10px 22px', borderRadius: 16 }}>BACKUP (REPLICA) + Failover 대기</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 14, minHeight: 0 }}>
                {channels.map((c) => (
                  <div key={c.db} style={{
                    background: '#fbfcfe', border: '1px solid #e8eef4', borderRadius: 13,
                    padding: '18px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                  }}>
                    <div>
                      <span style={{ ...dbChip, display: 'inline-block', fontSize: 20, fontWeight: 950, padding: '8px 18px', borderRadius: 8 }}>{c.db}</span>
                      <div style={{ fontSize: 16, color: '#64748b', fontWeight: 850, marginTop: 10 }}>{c.owner}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 14, color: '#94a3b8', fontWeight: 900, marginBottom: 3 }}>REPL. CHANNEL</div>
                      <div style={{ fontSize: 18, color: '#334155', fontWeight: 950 }}>{c.ch}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#eef4f8', border: '1px solid #d8e6f0', borderRadius: 13, padding: '13px 18px', color: '#356a8c', fontSize: 16.5, lineHeight: 1.35, fontWeight: 850, textAlign: 'center' }}>
              Keepalived VIP 기반 장애 전환으로 Master 서버 장애 시 백업 DB 서버가 서비스 연속성을 유지합니다.
            </div>
          </div>
        </div>
      </div>

      <div className={styles.pageNumber}>10</div>
    </div>
  );
}
