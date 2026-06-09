// Chapter 2 - 프로젝트 일정
import styles from './presentation.module.css';

export default function Chapter2() {
  const cellStyle = { padding: '8px 6px 0', verticalAlign: 'top' as const, borderLeft: '1px solid #e0e5ea', borderRight: '1px solid #e0e5ea', borderTop: '1px solid #e0e5ea', borderBottom: 'none', background: 'transparent' };
  const dateStyle = { fontSize: 13, fontWeight: 700, color: '#333' };
  const barGray = { background: '#dde4eb', padding: '8px 0', borderRadius: 6, textAlign: 'center' as const, fontSize: 13, fontWeight: 700, color: '#2c3e50' };
  const barBlue = { background: '#5B8CAE', padding: '8px 0', borderRadius: 6, textAlign: 'center' as const, fontSize: 13, fontWeight: 700, color: '#fff' };
  const barGrayTopR = { ...barGray, borderRadius: '6px 6px 0 0' };
  const barGrayBotR = { ...barGray, borderRadius: '0 0 6px 6px' };
  const barBlueTopR = { ...barBlue, borderRadius: '6px 6px 0 0' };
  const barBlueBotR = { ...barBlue, borderRadius: '0 0 6px 6px' };

  return (
    <div className={styles.slide}>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="ROAD A EYE" style={{ height: 40, width: 'auto', display: 'block' }} />
      </div>
      <div className={styles.teamBadge}>4조</div>

      <div style={{ display: 'flex', height: '100%', boxSizing: 'border-box', padding: '0 50px', gap: 30 }}>
        {/* 왼쪽: 제목 */}
        <div style={{ width: 240, display: 'flex', flexDirection: 'column', paddingTop: 94 }}>
          <div className={styles.chapterBadge}>Chapter 2</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, marginTop: 16, marginBottom: 12, lineHeight: 1.2 }}>
            프로젝트 일정
          </h1>
          <div style={{ width: 60, height: 3, background: '#2c3e50', marginBottom: 12 }} />
          <p style={{ fontSize: 16, color: '#555' }}>4월 4주차 - 6월 1주차</p>
        </div>

        {/* 오른쪽: 캘린더 */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', paddingTop: 70, paddingBottom: 60 }}>
          <div style={{ width: '100%', height: '100%', background: '#fff', borderRadius: 16, padding: '16px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', flex: 1 }}>
              <thead>
                <tr>
                  {['MON', 'TUE', 'WED', 'THU', 'FRI'].map((d) => (
                    <th key={d} style={{
                      padding: '8px 0',
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#555',
                      borderBottom: '2px solid #999',
                      textAlign: 'center',
                      width: '20%',
                    }}>{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* 1주차: 4/27 ~ 5/1 */}
                <tr>
                  {[27, 28, 29, 30, 1].map((d) => (
                    <td key={d} style={cellStyle}><div style={dateStyle}>{d}</div></td>
                  ))}
                </tr>
                <tr>
                  <td colSpan={5} style={{ padding: '0 0 6px', border: 'none' }}>
                    <div style={barGray}>Final Project 기획</div>
                  </td>
                </tr>

                {/* 2주차: 5/4 ~ 5/8 */}
                <tr>
                  {[4, 5, 6, 7, 8].map((d) => (
                    <td key={d} style={cellStyle}><div style={dateStyle}>{d}</div></td>
                  ))}
                </tr>
                <tr>
                  <td colSpan={2} style={{ padding: '0 2px 6px 0', border: 'none' }}>
                    <div style={barGray}>개발 환경 구축</div>
                  </td>
                  <td colSpan={3} style={{ padding: '0 0 6px 2px', border: 'none' }}>
                    <div style={barGray}>인프라 구축</div>
                  </td>
                </tr>

                {/* 3주차: 5/11 ~ 5/15 */}
                <tr>
                  {[11, 12, 13, 14, 15].map((d) => (
                    <td key={d} style={cellStyle}><div style={dateStyle}>{d}</div></td>
                  ))}
                </tr>
                <tr>
                  <td colSpan={3} style={{ padding: '0 2px 6px 0', border: 'none' }}>
                    <div style={barGray}>Back-end 및 Front-end 구축</div>
                  </td>
                  <td colSpan={2} style={{ padding: '0 0 6px 2px', border: 'none' }}>
                    <div style={barGrayTopR}>AI 데이터 수집 · 1차 AI 테스트</div>
                  </td>
                </tr>

                {/* 4주차: 5/18 ~ 5/22 */}
                <tr>
                  {[18, 19, 20, 21, 22].map((d) => (
                    <td key={d} style={cellStyle}><div style={dateStyle}>{d}</div></td>
                  ))}
                </tr>
                <tr>
                  <td colSpan={3} style={{ padding: '0 2px 6px 0', border: 'none' }}>
                    <div style={barGrayBotR}>DB 이중화 · 기능 구현</div>
                  </td>
                  <td colSpan={2} style={{ padding: '0 0 6px 2px', border: 'none' }}>
                    <div style={barGrayTopR}>AI 데이터 수집 · 2차 AI 테스트</div>
                  </td>
                </tr>

                {/* 5주차: 5/25 ~ 5/29 */}
                <tr>
                  {[25, 26, 27, 28, 29].map((d) => (
                    <td key={d} style={cellStyle}><div style={dateStyle}>{d}</div></td>
                  ))}
                </tr>
                <tr>
                  <td colSpan={3} style={{ padding: '0 2px 6px 0', border: 'none' }}>
                    <div style={barGrayBotR}>프론트 통합 · ITS 실시간 관제</div>
                  </td>
                  <td colSpan={2} style={{ padding: '0 0 6px 2px', border: 'none' }}>
                    <div style={barBlueTopR}>YOLO v11m 및 Keras 3차 테스트</div>
                  </td>
                </tr>

                {/* 6주차: 6/1 ~ 6/5 */}
                <tr>
                  {[1, 2, 3, 4, 5].map((d) => (
                    <td key={`jun${d}`} style={cellStyle}><div style={dateStyle}>6/{d}</div></td>
                  ))}
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: '0 2px 6px 0', border: 'none' }}>
                    <div style={barBlueBotR}>최종 통합 테스트 · 디버깅 · 발표 자료 준비</div>
                  </td>
                  <td colSpan={1} style={{ padding: '0 0 6px 2px', border: 'none' }}>
                    <div style={barBlueBotR}>최종 발표</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={styles.pageNumber}>4</div>
    </div>
  );
}
