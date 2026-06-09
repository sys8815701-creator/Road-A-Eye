import styles from './presentation.module.css';

export default function Chapter6_2() {
  return (
    <div className={styles.slide}>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="ROAD A EYE" style={{ height: 40, width: 'auto', display: 'block' }} />
      </div>
      <div className={styles.teamBadge}>4조</div>
      <div className={styles.dotPattern} />

      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '70px 50px 50px', boxSizing: 'border-box', alignItems: 'center' }}>
        <div className={styles.chapterBadge}>Chapter 6</div>
        <h1 className={styles.slideTitle} style={{ marginBottom: 20 }}>분석 · 관리</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, width: '100%', flex: 1 }}>
          <div className={styles.featureCard} style={{ padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className={styles.featureIcon} style={{ width: 44, height: 44, fontSize: 24 }}>📋</div>
            <div className={styles.featureTitle} style={{ fontSize: 20 }}>감지 기록</div>
            <div className={styles.featureDesc} style={{ fontSize: 17 }}>
              <ul className={styles.bulletList}>
                <li style={{ fontSize: 17, marginBottom: 8 }}>객체/상태/기간 필터</li>
                <li style={{ fontSize: 17, marginBottom: 8 }}>상세 모달 조회</li>
                <li style={{ fontSize: 17, marginBottom: 0 }}>미처리→확인/기각 상태 변경</li>
              </ul>
            </div>
          </div>
          <div className={styles.featureCard} style={{ padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className={styles.featureIcon} style={{ width: 44, height: 44, fontSize: 24 }}>📈</div>
            <div className={styles.featureTitle} style={{ fontSize: 20 }}>통계 리포트</div>
            <div className={styles.featureDesc} style={{ fontSize: 17 }}>
              <ul className={styles.bulletList}>
                <li style={{ fontSize: 17, marginBottom: 8 }}>시간대별/일별 감지 추이</li>
                <li style={{ fontSize: 17, marginBottom: 8 }}>객체 유형별 비율 차트</li>
                <li style={{ fontSize: 17, marginBottom: 0 }}>recharts 기반 시각화</li>
              </ul>
            </div>
          </div>
          <div className={styles.featureCard} style={{ padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className={styles.featureIcon} style={{ width: 44, height: 44, fontSize: 24 }}>🗺️</div>
            <div className={styles.featureTitle} style={{ fontSize: 20 }}>위험 구간 지도</div>
            <div className={styles.featureDesc} style={{ fontSize: 17 }}>
              <ul className={styles.bulletList}>
                <li style={{ fontSize: 17, marginBottom: 8 }}>히트맵 기반 위험도 표시</li>
                <li style={{ fontSize: 17, marginBottom: 8 }}>CCTV 위치 마커</li>
                <li style={{ fontSize: 17, marginBottom: 0 }}>구간별 감지 빈도 분석</li>
              </ul>
            </div>
          </div>
          <div className={styles.featureCard} style={{ padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className={styles.featureIcon} style={{ width: 44, height: 44, fontSize: 24 }}>🧠</div>
            <div className={styles.featureTitle} style={{ fontSize: 20 }}>AI 모델 관리</div>
            <div className={styles.featureDesc} style={{ fontSize: 17 }}>
              <ul className={styles.bulletList}>
                <li style={{ fontSize: 17, marginBottom: 8 }}>모델 버전 관리</li>
                <li style={{ fontSize: 17, marginBottom: 8 }}>정확도 추적</li>
                <li style={{ fontSize: 17, marginBottom: 0 }}>배포 이력 조회</li>
              </ul>
            </div>
          </div>
          <div className={styles.featureCard} style={{ padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className={styles.featureIcon} style={{ width: 44, height: 44, fontSize: 24 }}>👤</div>
            <div className={styles.featureTitle} style={{ fontSize: 20 }}>회원 시스템</div>
            <div className={styles.featureDesc} style={{ fontSize: 17 }}>
              <ul className={styles.bulletList}>
                <li style={{ fontSize: 17, marginBottom: 8 }}>가입(이메일 인증) · 로그인</li>
                <li style={{ fontSize: 17, marginBottom: 8 }}>JWT 8시간 토큰 인증</li>
                <li style={{ fontSize: 17, marginBottom: 0 }}>프로필 수정 · 탈퇴</li>
              </ul>
            </div>
          </div>
          <div className={styles.featureCard} style={{ padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className={styles.featureIcon} style={{ width: 44, height: 44, fontSize: 24 }}>📝</div>
            <div className={styles.featureTitle} style={{ fontSize: 20 }}>게시판 3종</div>
            <div className={styles.featureDesc} style={{ fontSize: 17 }}>
              <ul className={styles.bulletList}>
                <li style={{ fontSize: 17, marginBottom: 8 }}>공지사항 (핀 고정/페이지네이션)</li>
                <li style={{ fontSize: 17, marginBottom: 8 }}>FAQ 아코디언 (12건)</li>
                <li style={{ fontSize: 17, marginBottom: 0 }}>1:1 문의 (파일 첨부/상태 관리)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.pageNumber}>12</div>
    </div>
  );
}
