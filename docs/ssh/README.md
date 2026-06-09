# SSH 접속 설정

ROAD A EYE 4개 서버에 SSH alias로 접속하기 위한 **참고 문서**입니다.
실제 IP·계정·개인키·접속 이력은 보안상 저장소에 포함하지 않습니다.

| Alias | Role | Stack |
|-------|------|-------|
| `ai`    | AI 서버      | FastAPI :8001, YOLO, Keras, MySQL |
| `back`  | Back-end    | FastAPI :8000, JWT, MySQL |
| `front` | Front-end   | Next.js :3000, React 19 |
| `db`    | DB 백업      | MySQL 8.0 Replica, Keepalived |

## 사용법

1. [`ssh-config.example`](./ssh-config.example) 의 `<...>` 를 실제 IP/계정으로 채워 `~/.ssh/config` 에 추가
2. 팀에서 전달받은 개인키를 `~/.ssh/id_ed25519` 에 두고 권한 설정:
   ```bash
   chmod 600 ~/.ssh/id_ed25519
   ```
3. 접속: `ssh ai` / `ssh back` / `ssh front` / `ssh db`

## keys/

| 파일 | 용도 |
|------|------|
| `keys/ai-github-deploy.pub` | AI 서버 → GitHub 접근용 deploy **공개키** |
| `keys/back.pub`, `keys/db.pub` | 각 서버 **공개키** |

> 모두 공개키(`.pub`)이며 비밀이 아닙니다. **개인키(`id_ed25519` 등)는 저장소에 절대 올리지 않습니다.**

## ⚠️ 보안

- 실제 `~/.ssh/config`·`authorized_keys`·`known_hosts` 는 **올리지 않습니다** (서버 접속 권한·인프라 정보 노출 방지).
- 개인키·실제 IP·계정은 슬랙 등 안전한 채널로만 공유하세요.
