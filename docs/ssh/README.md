# SSH 접속 설정 (4개 서버)

ROAD A EYE 분산 서버에 SSH alias로 접속하기 위한 설정입니다.

| Alias | IP | Role | Stack |
|-------|-----|------|-------|
| `ai`    | 192.168.0.246 | AI 서버    | FastAPI :8001, YOLO, Keras, MySQL |
| `back`  | 192.168.0.247 | Back-end  | FastAPI :8000, JWT, MySQL |
| `front` | 192.168.0.248 | Front-end | Next.js :3000, React 19 |
| `db`    | 192.168.0.249 | DB 백업    | MySQL 8.0 Replica, Keepalived |

## 사용법

1. [`ssh-config`](./ssh-config) 내용을 `~/.ssh/config` 에 추가
2. 팀에서 전달받은 개인키를 배치하고 권한 설정:
   ```bash
   chmod 600 ~/.ssh/id_ed25519
   ```
3. 접속: `ssh ai` / `ssh back` / `ssh front` / `ssh db`

## ⚠️ 보안

- 개인키 `id_ed25519` 는 **이 저장소에 절대 커밋 금지.** 안전한 채널로만 전달.
- 이 저장소는 **Private** 이므로 내부망 IP가 포함돼 있습니다. 공개 전환 금지.
