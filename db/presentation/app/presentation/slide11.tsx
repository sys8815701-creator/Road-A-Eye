import styles from './presentation.module.css';

export default function Chapter6_1() {
  return (
    <div className={styles.slide}>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="ROAD A EYE" style={{ height: 40, width: 'auto', display: 'block' }} />
      </div>
      <div className={styles.teamBadge}>4조</div>
      <div className={styles.dotPattern} />

      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '70px 50px 50px', boxSizing: 'border-box', alignItems: 'center' }}>
        <div className={styles.chapterBadge}>Chapter 6</div>
        <h1 className={styles.slideTitle} style={{ marginBottom: 20 }}>실시간 관제</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, width: '100%', flex: 1 }}>
          <div className={styles.featureCard} style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className={styles.featureIcon} style={{ width: 44, height: 44, fontSize: 24 }}>📊</div>
            <div className={styles.featureTitle} style={{ fontSize: 20 }}>통합 관제 대시보드</div>
            <div className={styles.featureDesc} style={{ fontSize: 17 }}>
              <ul className={styles.bulletList}>
                <li style={{ fontSize: 17, marginBottom: 8 }}>오늘 감지 · 미확인 · 활성 CCTV · AI 정확도 실시간 표시</li>
                <li style={{ fontSize: 17, marginBottom: 8 }}>웹캠 자동 재생 + 고속도로 CCTV 클릭 즉시 재생</li>
                <li style={{ fontSize: 17, marginBottom: 0 }}>미확인 감지 실시간 WebSocket 알림 (LIVE 배지)</li>
              </ul>
            </div>
          </div>
          <div className={styles.featureCard} style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className={styles.featureIcon} style={{ width: 44, height: 44, fontSize: 24 }}>📹</div>
            <div className={styles.featureTitle} style={{ fontSize: 20 }}>스트림 관리</div>
            <div className={styles.featureDesc} style={{ fontSize: 17 }}>
              <ul className={styles.bulletList}>
                <li style={{ fontSize: 17, marginBottom: 8 }}>전국 고속도로 CCTV 자동 검색 (ITS API 연동)</li>
                <li style={{ fontSize: 17, marginBottom: 8 }}>권역별 칩 필터 + MJPEG 미리보기 · 모달 재생</li>
                <li style={{ fontSize: 17, marginBottom: 0 }}>AI 서버 stream start/stop 제어</li>
              </ul>
            </div>
          </div>
          <div className={styles.featureCard} style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className={styles.featureIcon} style={{ width: 44, height: 44, fontSize: 24 }}>🔔</div>
            <div className={styles.featureTitle} style={{ fontSize: 20 }}>실시간 알림 시스템</div>
            <div className={styles.featureDesc} style={{ fontSize: 17 }}>
              <ul className={styles.bulletList}>
                <li style={{ fontSize: 17, marginBottom: 8 }}>WebSocket 기반 감지 즉시 알림 Push</li>
                <li style={{ fontSize: 17, marginBottom: 8 }}>알림 이력 · 읽음/삭제 · 배지(9+) 처리</li>
                <li style={{ fontSize: 17, marginBottom: 0 }}>역할별 분리 (관리자: 위험/시스템, 일반: 공지/계정)</li>
              </ul>
            </div>
          </div>
          <div className={styles.featureCard} style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className={styles.featureIcon} style={{ width: 44, height: 44, fontSize: 24 }}>🤖</div>
            <div className={styles.featureTitle} style={{ fontSize: 20 }}>AI 챗봇</div>
            <div className={styles.featureDesc} style={{ fontSize: 17 }}>
              <ul className={styles.bulletList}>
                <li style={{ fontSize: 17, marginBottom: 8 }}>SSE 스트리밍 — 글자 단위 누적 표시</li>
                <li style={{ fontSize: 17, marginBottom: 8 }}>말풍선 애니메이션 + 통통 점 인디케이터</li>
                <li style={{ fontSize: 17, marginBottom: 0 }}>AI 서버 LLM 프록시 경유 (OpenAI API)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.pageNumber}>11</div>
    </div>
  );
}
