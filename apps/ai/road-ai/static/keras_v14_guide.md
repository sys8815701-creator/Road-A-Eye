# Keras v14 학습 가이드

> **v13 문제**: car 데이터 5,000장 과다 → 모델이 "항상 안전(0%)" 학습  
> **v14 목표**: 비율 재조정 + 에폭 축소 → 균형 잡힌 이진 판별

---

## v11~v13 실패 분석

| 버전 | car 데이터 | 결과 | 원인 |
|---|---|---|---|
| v11 / v12 | 880장 (10%) | 항상 100% 금지 | car 데이터 너무 부족 |
| **v13** | 5,000장 (40%) | **항상 0% 안전** | car 데이터 너무 많음 |
| **v14 목표** | **2,500장 (25%)** | **정상 판별** | 균형 비율 |

```
실제 고속도로 현실:
  일반 차량(car) : 진입금지 차량 = 약 97 : 3
  → 학습 데이터는 이보다 금지 비율을 높여야 모델이 금지를 학습함

v14 권장 비율:
  car 2,500장 : 금지 7,660장 = 1 : 3
  → 모델이 "드물지만 반드시 잡아야 하는" 금지 차량을 제대로 학습
```

---

## Step 1. 증강 재실행 (target 변경)

기존 `car_augmented` 폴더를 **삭제**하고 새로 생성합니다.

```bash
# 기존 증강 폴더 삭제
rmdir /s /q dataset\car_augmented      # Windows
rm -rf dataset/car_augmented           # Mac/Linux

# 2,500장으로 새로 증강
python augment_car_data.py \
  --input  ./dataset/train/car \
  --output ./dataset/car_augmented \
  --target 2500
```

완료 후 `train/car/` 에 복사:

```bash
# 기존 증강 이미지 제거 후 새 증강 이미지 복사
# (원본 880+730=1,610장은 유지, 증강분만 교체)

# Windows
copy /Y dataset\car_augmented\aug_*.jpg dataset\train\car\

# Mac/Linux
cp dataset/car_augmented/aug_*.jpg dataset/train/car/
```

---

## Step 2. 파인튜닝 스크립트 수정

`keras_finetune_v13.py` 파일 상단 설정값을 아래처럼 변경합니다:

```python
# ── 설정 (상단에서 찾아서 수정) ──────────────────────
BATCH_SIZE  = 16
EPOCHS_BIN  = 15    # 20 → 15 (과적합 방지)
EPOCHS_TOP  = 5     # 10 → 5  (보수적 파인튜닝)
```

---

## Step 3. 파인튜닝 실행

```bash
python keras_finetune_v13.py \
  --model  highway_model_v13.keras \
  --data   ./dataset \
  --output highway_model_v14.keras
```

> `--model` 을 v13으로 지정합니다 (v13이 완전히 잘못된 건 아니라 출발점으로 사용)  
> v12에서 시작해도 됩니다: `--model highway_model_v12.keras`

---

## Step 4. 합격 기준 확인

스크립트 완료 시 자동 출력:

```
이상값 테스트:
  ✅ 흰색(255): 금지확률=xx.x%  ← 10~60% 범위면 합격
  ✅ 검은색(0):  금지확률=xx.x%  ← 10~60% 범위면 합격
```

### 합격 기준표

| 항목 | 합격 | 불합격 |
|---|---|---|
| 흰색/검은색 금지확률 | **10% ~ 60%** | 0% 또는 100% 고정 |
| 실제 CCTV 금지확률 | **30% ~ 80%** | 0% 또는 100% 고정 |
| 입력별 다른 값 | 각기 다른 수치 | 모두 동일 |

> **핵심**: 0%도 100%도 아닌 **입력에 따라 달라지는 값**이 나오면 성공입니다.

---

## 만약 또 실패한다면

### 케이스 A: 또 0% (너무 안전)
```python
# car 데이터를 더 줄이기
--target 1500   # 2500 → 1500
```

### 케이스 B: 또 100% (너무 위험)
```python
# car 데이터를 더 늘리기
--target 3500   # 2500 → 3500
```

### 케이스 C: 수렴 안 됨 (loss가 감소 안 함)
```python
EPOCHS_BIN = 25   # 에폭 늘리기
```

---

## 업로드

```
http://192.168.0.246:8001/model-upload
→ Keras v3 선택 → highway_model_v14.keras
```

완료 후 알려주시면 즉시 테스트해드립니다.

---

## 전체 순서 요약

```
① car_augmented 폴더 삭제 후 target=2500 으로 재증강
② train/car/ 에 새 증강 이미지 복사
③ keras_finetune_v13.py 에서 EPOCHS_BIN=15, EPOCHS_TOP=5 로 수정
④ python keras_finetune_v13.py --model v13.keras --output v14.keras
⑤ 이상값 테스트 10~60% 범위 확인
⑥ http://192.168.0.246:8001/model-upload 에서 업로드
```
