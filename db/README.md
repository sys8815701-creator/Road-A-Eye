# DB 스키마

ROAD A EYE 데이터베이스의 **구조(스키마)만** 보관합니다. 실제 데이터(개인정보 포함)는 올리지 않습니다.

## 구성

| 파일 | DB | 서버 |
|------|-----|------|
| [schema/ai_db.sql](./schema/ai_db.sql)         | ai_db (AI 감지 데이터) | AI :8001 |
| [schema/member_db.sql](./schema/member_db.sql) | member_db (회원)       | Back :8000 |
| [schema/board_db.sql](./schema/board_db.sql)   | board_db (게시판)      | Back :8000 |
| [schema/chat_db.sql](./schema/chat_db.sql)     | chat_db (채팅)         | Back :8000 |

> 각 `.sql` 은 `mysqldump` 출력에서 `INSERT`(데이터)를 제거한 `CREATE TABLE` 정의입니다.

## 사용

```bash
mysql -u <user> -p <db명> < db/schema/<db명>.sql
```

## ⚠️ 주의

- **실제 백업(`*.sql.gz`)은 절대 커밋하지 마세요.** 사용자 실명·이메일·전화번호·비밀번호 해시가 들어있습니다. `.gitignore`로 차단돼 있습니다.
- 실데이터 백업은 db 서버(192.168.0.249)의 `~/db_backups/` 에 매일 자동 보관됩니다.
