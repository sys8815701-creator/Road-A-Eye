from pydantic import BaseModel
from typing import List, Optional


class ItsCamera(BaseModel):
    camera_id: str
    name: str
    coord_x: str
    coord_y: str
    stream_url: str
    road_section_id: str = ""


class DetectionItem(BaseModel):
    class_name: str
    confidence: float
    box: dict


class FrameAnalysis(BaseModel):
    camera_id: str
    camera_name: str
    timestamp: str
    yolo_count: int
    yolo_detections: List[DetectionItem]
    vehicle_class: str
    is_prohibited: bool
    confidence: float
    alert: str


class StreamStatus(BaseModel):
    camera_id: str
    name: str
    is_active: bool
    frame_count: int
    analyzed_count:   int = 0        # AI 분석 완료 프레임 수
    keras_pass_count: int = 0        # Keras가 "금지 차량" 판별 횟수
    detection_count:  int = 0        # 실제 금지 차량 감지 누적 수
    last_analyzed_at: Optional[str] = None  # 마지막 분석 시각


class StartStreamRequest(BaseModel):
    camera_id: str
    stream_url: str
    name: str = ""


class StopStreamRequest(BaseModel):
    camera_id: str
