from fastapi import APIRouter, File, UploadFile, HTTPException, WebSocket, WebSocketDisconnect

from app.modules.keras.schemas import ClassifyResponse, StatsResponse, ModelInfoResponse
from app.infrastructure.model_registry import get_keras_metadata, list_versions

router = APIRouter(prefix="/keras", tags=["keras"])


@router.post("/classify", response_model=ClassifyResponse)
async def classify(file: UploadFile = File(...)):
    """이미지 파일을 업로드하여 차량 분류"""
    from app.modules.keras import classifier

    # 모델 미로드 시 재학습 상태 응답 (오류 대신 503)
    if not classifier.is_loaded():
        raise HTTPException(
            status_code=503,
            detail="Keras 모델 재학습 진행 중입니다. 학습 완료 후 업로드 시 자동 활성화됩니다."
        )
    try:
        from app.modules.keras import service
        image_bytes = await file.read()
        return service.classify_image(image_bytes)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stats", response_model=StatsResponse)
async def get_stats():
    """누적 분류 통계 조회"""
    from app.modules.keras import service

    return service.get_stats()


@router.get("/model-info", response_model=ModelInfoResponse)
async def get_model_info(version: str = "v1"):
    """모델 버전 정보 조회"""
    try:
        meta = get_keras_metadata(version)
        return ModelInfoResponse(**meta, status="loaded")
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.get("/versions")
async def get_versions():
    """사용 가능한 Keras 모델 버전 목록"""
    return {"versions": list_versions("keras")}


@router.websocket("/ws")
async def websocket_classify(websocket: WebSocket):
    """웹소켓으로 실시간 프레임 분류 (Base64 이미지 수신)"""
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_json()
            b64 = data.get("frame", "")
            if not b64:
                continue
            from app.modules.keras import service

            result = service.classify_b64(b64)
            await websocket.send_json(result.model_dump())
    except WebSocketDisconnect:
        pass
    except Exception as e:
        await websocket.send_json({"error": str(e)})
