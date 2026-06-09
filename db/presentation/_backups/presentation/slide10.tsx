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
    icon: '🤖', accent: '#7c3aed', vip: 'VIP 192.168.0.250', name: 'AI 서버', ip: '192.168.0.246',
    role: 'PRIMARY (MASTER)', dbs: ['ai_db (server-id=1)'],
  },
  {
    icon: '⚙️', accent: '#0d9488', vip: 'VIP 192.168.0.251', name: 'Back-end 서버', ip: '192.168.0.247',
    role: 'PRIMARY (MASTER)', dbs: ['member_db (server-id=2)', 'board_db', 'chat_db'],
  },
  {
    icon: '</>', accent: '#6366f1', name: 'Front-end 서버', ip: '192.168.0.248',
    dbs: [], note: 'JWT API 호출 · DB 직접 접속 불필요',
  },
];

const channels = [
  { db: 'ai_db', ch: 'ai-server' },
  { db: 'member_db', ch: 'backend-server' },
  { db: 'board_db', ch: 'backend-server' },
  { db: 'chat_db', ch: 'backend-server' },
];

const dbChip = { background: '#e9f7ef', color: '#1e7e44', border: '1px solid #c7ead4' } as const;

export default function Chapter6_3() {
  return (
    <div className={styles.slide}>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="ROAD A EYE" style={{ height: 40, width: 'auto', display: 'block' }} />
      </div>
      <div className={styles.teamBadge}>4조</div>

      <div className={styles.contentTop} style={{ padding: '70px 50px 40px' }}>
        <div className={styles.chapterBadge}>Chapter 5</div>
        <h1 className={styles.slideTitle} style={{ marginBottom: 22 }}>DB 이중화</h1>

        <div style={{ width: '100%', padding: '0 30px', boxSizing: 'border-box' }}>
          {/* 상단: 3개 서버 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {servers.map((s) => (
              <div key={s.name} style={{
                position: 'relative', background: '#fff', borderRadius: 16,
                border: '1px solid #e6eef4', boxShadow: '0 6px 20px rgba(91,140,174,0.14)',
                padding: '18px 18px 16px', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9,
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: s.accent }} />

                {/* VIP 슬롯 (높이 고정으로 정렬) */}
                <div style={{ height: 26, display: 'flex', alignItems: 'center' }}>
                  {s.vip && (
                    <span style={{
                      background: `${s.accent}14`, border: `1px solid ${s.accent}33`, color: s.accent,
                      fontSize: 12.5, fontWeight: 800, padding: '4px 13px', borderRadius: 14, whiteSpace: 'nowrap',
                    }}>{s.vip}</span>
                  )}
                </div>

                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: `${s.accent}14`, border: `1px solid ${s.accent}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: s.icon === '</>' ? 22 : 28, fontWeight: 800, color: s.accent,
                }}>{s.icon}</div>

                <div style={{ fontSize: 20, fontWeight: 800, color: '#1f2d3d', letterSpacing: '-0.3px' }}>{s.name}</div>
                <div style={{ fontSize: 14, color: '#7a8896', fontWeight: 600, fontFamily: 'monospace' }}>{s.ip}</div>

                {s.role ? (
                  <span style={{ background: s.accent, color: '#fff', fontSize: 13.5, fontWeight: 800, padding: '5px 16px', borderRadius: 16 }}>{s.role}</span>
                ) : (
                  <span style={{ background: '#fef3e7', color: '#c2670a', border: '1px solid #f6dcb8', fontSize: 13, fontWeight: 700, padding: '5px 14px', borderRadius: 16 }}>DB 직접 접속 없음</span>
                )}

                {s.dbs.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center', marginTop: 2 }}>
                    {s.dbs.map((d) => (
                      <span key={d} style={{ ...dbChip, fontSize: 12.5, fontWeight: 700, padding: '4px 10px', borderRadius: 7 }}>{d}</span>
                    ))}
                  </div>
                )}
                {s.note && (
                  <div style={{ fontSize: 13, color: '#8a98a6', fontWeight: 600, textAlign: 'center', marginTop: 2 }}>{s.note}</div>
                )}
              </div>
            ))}
          </div>

          {/* 복제 배너 */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '18px 0' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#fef3e7', border: '1px solid #f6dcb8', color: '#c2670a',
              fontSize: 15, fontWeight: 800, padding: '9px 22px', borderRadius: 22,
            }}>
              ↕ 양방향 Master-Master Replication (binlog) ↕
            </span>
          </div>

          {/* 하단: 백업/복제 서버 */}
          <div style={{
            position: 'relative', background: '#fff', borderRadius: 16,
            border: '1px solid #e6eef4', boxShadow: '0 6px 20px rgba(91,140,174,0.14)',
            padding: '20px 24px', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: '#dc2626' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 16 }}>
              <span style={{ fontSize: 26 }}>🗄️</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#1f2d3d' }}>DB 백업 서버</span>
              <span style={{ fontSize: 14, color: '#7a8896', fontWeight: 600, fontFamily: 'monospace' }}>192.168.0.249 (server-id=3)</span>
              <span style={{ background: '#dc2626', color: '#fff', fontSize: 13.5, fontWeight: 800, padding: '5px 16px', borderRadius: 16 }}>BACKUP (REPLICA) + Failover 대기</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {channels.map((c) => (
                <div key={c.db} style={{
                  background: '#fbfcfe', border: '1px solid #e8eef4', borderRadius: 12,
                  padding: '12px 10px', textAlign: 'center',
                }}>
                  <span style={{ ...dbChip, display: 'inline-block', fontSize: 13, fontWeight: 800, padding: '4px 12px', borderRadius: 7 }}>{c.db}</span>
                  <div style={{ fontSize: 12, color: '#8a98a6', fontWeight: 600, marginTop: 7 }}>채널 : {c.ch}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.pageNumber}>10</div>
    </div>
  );
}
