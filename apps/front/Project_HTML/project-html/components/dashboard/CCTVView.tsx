"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import { Maximize2, Minimize2, Settings, Video, ChevronLeft, ChevronRight, X, ScanLine } from "lucide-react";
import styles from "./CCTVView.module.css";
import ConfirmModal from "../ConfirmModal";

interface Camera {
    cctv_no: number;
    its_cctv_id?: string | null;  // 삭제 시 AI 서버 stream/stop에 필요
    name: string;
    is_active: boolean;
}

interface CctvFocusTarget {
    requestId: number;
    cctv_no?: number | null;
    its_cctv_id?: string | null;
    camera_id?: string | null;
    cctv_name?: string | null;
    name?: string | null;
}

interface CCTVViewProps {
    focusTarget?: CctvFocusTarget | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.0.247:8000";

type FitMode = "cover" | "contain";
type WebcamAiState = "idle" | "analyzing" | "error";

const WEBCAM_ANALYSIS_INTERVAL_MS = 2000;
const WEBCAM_CAPTURE_MAX_WIDTH = 640;

const MAJOR_CCTV_NAMES = [
    "[경부선] 판교분기점",
    "[수도권제1순환선] 판교램프",
    "[수도권제1순환선] 판교분기점",
    "[용인서울선]서판교IC진입 서울",
];

type FullscreenDocument = Document & {
    webkitFullscreenElement?: Element | null;
    webkitExitFullscreen?: () => void;
};

type FullscreenElement = HTMLDivElement & {
    webkitRequestFullscreen?: () => void;
};

export default function CCTVView({ focusTarget }: CCTVViewProps) {
    const [cameras,  setCameras]  = useState<Camera[]>([]);
    const [selected, setSelected] = useState<Camera | null>(null);
    const [isWebcam, setIsWebcam] = useState(true); // 접속한 기기의 웹캠을 기본으로 가장 먼저 표시
    const [webcamError, setWebcamError] = useState<string | null>(null);
    const [fitMode, setFitMode] = useState<FitMode>("cover");
    const [showStatus, setShowStatus] = useState(true);
    const [showCameraStrip, setShowCameraStrip] = useState(true);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoRef        = useRef<HTMLVideoElement>(null);
    const containerRef    = useRef<HTMLDivElement>(null);
    const webcamCanvasRef = useRef<HTMLCanvasElement>(null);   // bbox 오버레이
    const webcamAnalyzingRef = useRef(false);
    const [webcamAiState, setWebcamAiState] = useState<WebcamAiState>("idle");

    // 실시간 고속도로 CCTV 목록 불러오기 + 10초마다 자동 갱신
    // — 사용자가 스트림 관리에서 새 카메라 시작/삭제 시 대시보드도 자동 반영
    useEffect(() => {
        const fetchCameras = async () => {
            try {
                const r = await fetch(`${API_URL}/its/stream/status`, { signal: AbortSignal.timeout(5000) });
                const data = await r.json();
                let list: Camera[] = (data?.streams || [])
                    .filter((s: any) => s.is_active && s.cctv_no)
                    .map((s: any) => ({
                        cctv_no: s.cctv_no,
                        its_cctv_id: s.camera_id,
                        name: s.name || s.camera_id,
                        is_active: true,
                    }));

                if (list.length === 0) {
                    const cctvResp = await fetch(`${API_URL}/cctv?active_only=true`, { signal: AbortSignal.timeout(5000) });
                    const cctvData = await cctvResp.json();
                    const priorityOrder = new Map(MAJOR_CCTV_NAMES.map((name, index) => [name, index]));
                    list = (cctvData?.data?.cctvs || [])
                        .filter((c: any) => c.is_active && c.cctv_no)
                        .sort((a: any, b: any) => {
                            const ao = priorityOrder.get(a.name) ?? 999;
                            const bo = priorityOrder.get(b.name) ?? 999;
                            if (ao !== bo) return ao - bo;
                            return a.cctv_no - b.cctv_no;
                        })
                        .map((c: any) => ({
                            cctv_no: c.cctv_no,
                            its_cctv_id: c.its_cctv_id,
                            name: c.name || c.its_cctv_id || `CCTV ${c.cctv_no}`,
                            is_active: true,
                        }));
                }

                setCameras(list);
                // 처음 로드 시에만 자동으로 첫 카메라 선택. 선택한 카메라가 꺼졌으면 첫 활성 카메라로 교체.
                setSelected(prev => {
                    if (prev && list.some(cam => cam.cctv_no === prev.cctv_no)) return prev;
                    return list[0] || null;
                });
            } catch {}
        };
        fetchCameras();
        const t = setInterval(fetchCameras, 10000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        if (!focusTarget) return;

        const targetIds = [
            focusTarget.its_cctv_id,
            focusTarget.camera_id,
        ].filter(Boolean).map(v => String(v));
        const targetNames = [
            focusTarget.cctv_name,
            focusTarget.name,
        ].filter(Boolean).map(v => String(v));
        const isWebcamTarget = targetIds.includes("webcam-demo") || targetNames.some(name => name.includes("웹캠"));

        if (isWebcamTarget) {
            setIsWebcam(true);
            return;
        }
        if (cameras.length === 0) return;

        const match = cameras.find(cam => {
            if (focusTarget.cctv_no != null && cam.cctv_no === Number(focusTarget.cctv_no)) return true;
            if (cam.its_cctv_id && targetIds.includes(cam.its_cctv_id)) return true;
            return targetNames.includes(cam.name);
        });

        if (!match) return;
        setSelected(match);
        setIsWebcam(false);
    }, [focusTarget?.requestId, cameras, focusTarget]);

    // ConfirmModal 상태 — 삭제 확인용
    const [pendingDelete, setPendingDelete] = useState<Camera | null>(null);

    useEffect(() => {
        const syncFullscreenState = () => {
            const doc = document as FullscreenDocument;
            const current = document.fullscreenElement || doc.webkitFullscreenElement || null;
            setIsFullscreen(current === containerRef.current);
        };

        document.addEventListener("fullscreenchange", syncFullscreenState);
        document.addEventListener("webkitfullscreenchange", syncFullscreenState as EventListener);
        return () => {
            document.removeEventListener("fullscreenchange", syncFullscreenState);
            document.removeEventListener("webkitfullscreenchange", syncFullscreenState as EventListener);
        };
    }, []);

    const toggleFullscreen = () => {
        const doc = document as FullscreenDocument;
        const current = document.fullscreenElement || doc.webkitFullscreenElement || null;
        try {
            if (current) {
                if (document.exitFullscreen) document.exitFullscreen();
                else doc.webkitExitFullscreen?.();
                return;
            }

            const target = containerRef.current as FullscreenElement | null;
            if (!target) return;
            if (target.requestFullscreen) target.requestFullscreen();
            else target.webkitRequestFullscreen?.();
        } catch {}
    };

    // ✕ 클릭 → 확인 모달 오픈 (이벤트 버블링 차단 필수)
    const requestDelete = (cam: Camera, e: React.MouseEvent) => {
        e.stopPropagation();
        setPendingDelete(cam);
    };

    // 모달에서 "삭제" 확인 시 실제 삭제 작업 수행
    const confirmDelete = async () => {
        const cam = pendingDelete;
        if (!cam) return;
        try {
            // 1) 분석 중지 (its_cctv_id가 있을 때만 — 시드 데이터는 없을 수 있음)
            if (cam.its_cctv_id) {
                await fetch(`${API_URL}/its/stream/stop`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ camera_id: cam.its_cctv_id }),
                }).catch(() => {});  // 이미 중지된 상태일 수 있어 실패 무시
            }
            // 2) 백엔드 cctvs 비활성화 (soft delete)
            await fetch(`${API_URL}/cctv/${cam.cctv_no}`, { method: "DELETE" });
            // 3) 로컬 목록에서 제거 + 선택 해제 시 웹캠으로 복귀
            setCameras(cs => cs.filter(c => c.cctv_no !== cam.cctv_no));
            if (selected?.cctv_no === cam.cctv_no) {
                setSelected(null);
                setIsWebcam(true);
            }
        } catch {
            // 실패 안내는 모달이 닫힌 후 표시
        } finally {
            setPendingDelete(null);
        }
    };

    // 웹캠 선택 시 접속한 기기의 카메라 연결
    useEffect(() => {
        if (!isWebcam) return;

        if (!navigator.mediaDevices?.getUserMedia) {
            setWebcamError("이 브라우저에서 카메라를 사용할 수 없습니다. (HTTPS 접속 또는 브라우저 보안 설정이 필요합니다)");
            return;
        }

        let stream: MediaStream | null = null;
        let cancelled = false;

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then(s => {
                if (cancelled) {
                    s.getTracks().forEach(t => t.stop());
                    return;
                }
                stream = s;
                if (videoRef.current) videoRef.current.srcObject = s;
                setWebcamError(null);
            })
            .catch(() => {
                if (!cancelled) setWebcamError("웹캠에 접근할 수 없습니다. 카메라 권한을 확인해 주세요.");
            });

        return () => {
            cancelled = true;
            stream?.getTracks().forEach(t => t.stop());
        };
    }, [isWebcam]);

    /** 웹캠 분석 결과를 canvas에 bbox로 표시 */
    const drawWebcamBoxes = (
        dets: Array<{ class_name?: string; confidence?: number; box?: { x1: number; y1: number; x2: number; y2: number } }>,
        captureW: number,
        captureH: number
    ) => {
        const canvas = webcamCanvasRef.current;
        if (!canvas) return;
        const scaleX = canvas.offsetWidth  / Math.max(captureW, 1);
        const scaleY = canvas.offsetHeight / Math.max(captureH, 1);
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const det of dets) {
            const box = det.box;
            if (!box) continue;
            const x1 = box.x1 * scaleX, y1 = box.y1 * scaleY;
            const w  = (box.x2 - box.x1) * scaleX;
            const h  = (box.y2 - box.y1) * scaleY;
            const cls = det.class_name ?? "";
            const isForbidden = cls !== "car";
            const color = isForbidden ? "#e11d48" : "#16a34a";
            ctx.strokeStyle = color;
            ctx.lineWidth   = isForbidden ? 3 : 2;
            ctx.strokeRect(x1, y1, w, h);
            const label = `${cls} ${((det.confidence ?? 0) * 100).toFixed(0)}%`;
            ctx.font = "bold 13px sans-serif";
            const tw = ctx.measureText(label).width;
            ctx.fillStyle = color;
            ctx.fillRect(x1, Math.max(y1 - 22, 0), tw + 8, 22);
            ctx.fillStyle = "#fff";
            ctx.fillText(label, x1 + 4, Math.max(y1 - 6, 14));
        }
    };

    // 웹캠 프레임을 주기적으로 Next API 프록시에 보내 실제 YOLO 분석을 수행한다.
    useEffect(() => {
        if (!isWebcam || webcamError) {
            setWebcamAiState("idle");
            webcamAnalyzingRef.current = false;
            return;
        }

        let stopped = false;
        const canvas = document.createElement("canvas");

        const analyzeFrame = () => {
            const video = videoRef.current;
            if (!video || video.readyState < 2 || !video.videoWidth || !video.videoHeight) return;
            if (webcamAnalyzingRef.current) return;

            webcamAnalyzingRef.current = true;
            const scale = Math.min(1, WEBCAM_CAPTURE_MAX_WIDTH / video.videoWidth);
            canvas.width = Math.max(1, Math.round(video.videoWidth * scale));
            canvas.height = Math.max(1, Math.round(video.videoHeight * scale));
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                webcamAnalyzingRef.current = false;
                return;
            }
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(async (blob) => {
                if (stopped) {
                    webcamAnalyzingRef.current = false;
                    return;
                }
                if (!blob) {
                    webcamAnalyzingRef.current = false;
                    setWebcamAiState("error");
                    return;
                }

                const formData = new FormData();
                formData.append("file", blob, "webcam.jpg");

                try {
                    const resp = await fetch("/api/webcam/predict", {
                        method: "POST",
                        body: formData,
                    });
                    if (!resp.ok) throw new Error("webcam predict failed");
                    const result = await resp.json();
                    if (!stopped) {
                        setWebcamAiState("analyzing");
                        // bbox 오버레이 그리기
                        drawWebcamBoxes(result?.all_detections ?? [], canvas.width, canvas.height);
                    }
                    if (result?.forbidden_detections?.length > 0) {
                        window.dispatchEvent(new CustomEvent("roadeye-webcam-forbidden", { detail: result }));
                    }
                } catch {
                    if (!stopped) setWebcamAiState("error");
                } finally {
                    webcamAnalyzingRef.current = false;
                }
            }, "image/jpeg", 0.78);
        };

        const first = window.setTimeout(analyzeFrame, 500);
        const timer = window.setInterval(analyzeFrame, WEBCAM_ANALYSIS_INTERVAL_MS);
        return () => {
            stopped = true;
            window.clearTimeout(first);
            window.clearInterval(timer);
            webcamAnalyzingRef.current = false;
        };
    }, [isWebcam, webcamError]);

    const [showAnnotated, setShowAnnotated] = useState(false);
    const [annotatedSrc, setAnnotatedSrc] = useState<string | null>(null);

    // annotated 모드: MJPEG 스트림 대신 1초 폴링 (렉 방지 — AI 분석이 1fps라 충분)
    useEffect(() => {
        if (!showAnnotated || !selected?.cctv_no) {
            setAnnotatedSrc(null);
            return;
        }
        const refresh = () =>
            setAnnotatedSrc(
                `${API_URL}/cctv/${selected.cctv_no}/annotated-snapshot?t=${Date.now()}`
            );
        refresh();
        const timer = setInterval(refresh, 1000);
        return () => { clearInterval(timer); setAnnotatedSrc(null); };
    }, [showAnnotated, selected?.cctv_no]);

    const streamUrl = selected
        ? `${API_URL}/cctv/${selected.cctv_no}/stream`
        : null;
    const locationName = isWebcam ? "내 웹캠 (실시간)" : selected?.name || "카메라 없음";
    const connected = isWebcam ? !webcamError : !!streamUrl;
    const aiStatusText = isWebcam
        ? (webcamAiState === "error" ? "웹캠 AI 분석 재시도 중" : "웹캠 AI 분석 중")
        : "AI 감지 중";
    const connectionStatusText = connected ? "정상" : "대기 중";
    const mediaStyle: CSSProperties = { width: "100%", height: "100%", objectFit: fitMode, display: "block" };

    return (
        <div ref={containerRef} className={`${styles.container} ${isFullscreen ? styles.fullscreen : ""}`}>
            <div className={styles.viewHeader}>
                <div className={styles.titleGroup}>
                    <Video size={24} className={styles.icon} />
                    <h3>실시간 CCTV</h3>
                    <span className={styles.liveBadge}>● LIVE</span>
                    <span className={styles.locationName}>{locationName}</span>
                </div>
                <div className={styles.controls}>
                    <div className={styles.settingsWrap}>
                        <button
                            type="button"
                            className={`${styles.toolBtn} ${settingsOpen ? styles.activeTool : ""}`}
                            title="영상 설정"
                            aria-label="영상 설정"
                            aria-expanded={settingsOpen}
                            onClick={() => setSettingsOpen(v => !v)}
                        >
                            <Settings size={24} />
                        </button>
                        {settingsOpen && (
                            <div className={styles.settingsPanel} role="dialog" aria-label="CCTV 설정">
                                <div className={styles.settingsHeader}>
                                    <span>영상 설정</span>
                                    <button type="button" onClick={() => setSettingsOpen(false)} aria-label="설정 닫기">
                                        <X size={14} />
                                    </button>
                                </div>

                                <div className={styles.settingGroup}>
                                    <span className={styles.settingLabel}>화면 비율</span>
                                    <div className={styles.segmented}>
                                        <button
                                            type="button"
                                            className={fitMode === "cover" ? styles.selected : ""}
                                            onClick={() => setFitMode("cover")}
                                        >
                                            채우기
                                        </button>
                                        <button
                                            type="button"
                                            className={fitMode === "contain" ? styles.selected : ""}
                                            onClick={() => setFitMode("contain")}
                                        >
                                            전체 보기
                                        </button>
                                    </div>
                                </div>

                                <label className={styles.toggleRow}>
                                    <span>상태 바</span>
                                    <span className={styles.switch}>
                                        <input
                                            type="checkbox"
                                            checked={showStatus}
                                            onChange={e => setShowStatus(e.target.checked)}
                                        />
                                        <span />
                                    </span>
                                </label>

                                <label className={styles.toggleRow}>
                                    <span>카메라 목록</span>
                                    <span className={styles.switch}>
                                        <input
                                            type="checkbox"
                                            checked={showCameraStrip}
                                            onChange={e => setShowCameraStrip(e.target.checked)}
                                        />
                                        <span />
                                    </span>
                                </label>
                            </div>
                        )}
                    </div>
                    {/* AI 분석 오버레이 토글 — ITS 카메라에서만 표시 */}
                    {selected && !isWebcam && (
                        <button
                            type="button"
                            className={styles.toolBtn}
                            title={showAnnotated ? "AI 박스 숨기기" : "AI 감지 박스 표시"}
                            aria-label={showAnnotated ? "AI 박스 숨기기" : "AI 감지 박스 표시"}
                            onClick={() => setShowAnnotated(v => !v)}
                            style={showAnnotated ? { color: "#e11d48", borderColor: "#e11d48" } : undefined}
                        >
                            <ScanLine size={24} />
                        </button>
                    )}
                    <button
                        type="button"
                        className={styles.toolBtn}
                        title={isFullscreen ? "전체화면 종료" : "전체화면"}
                        aria-label={isFullscreen ? "전체화면 종료" : "전체화면"}
                        onClick={toggleFullscreen}
                    >
                        {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
                    </button>
                </div>
            </div>

            <div className={styles.videoWrapper}>
                {isWebcam ? (
                    /* 웹캠은 페이지 진입 시 자동 시작 — 사용자 의도 */
                    webcamError ? (
                        <div className={styles.videoPlaceholder}>
                            <p>{webcamError}</p>
                        </div>
                    ) : (
                        <div style={{ position: "relative", width: "100%", height: "100%" }}>
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                playsInline
                                style={mediaStyle}
                            />
                            {/* AI 탐지 bbox 오버레이 */}
                            <canvas
                                ref={webcamCanvasRef}
                                style={{
                                    position: "absolute", top: 0, left: 0,
                                    width: "100%", height: "100%",
                                    pointerEvents: "none",
                                }}
                            />
                        </div>
                    )
                ) : selected && (showAnnotated ? annotatedSrc : streamUrl) ? (
                    /* 고속도로 CCTV
                       - 일반 모드: MJPEG 스트림
                       - AI 박스 모드: 1초 폴링 스냅샷 (렉 없음) */
                    <img
                        src={(showAnnotated ? annotatedSrc : streamUrl)!}
                        alt={`${selected.name} 실시간 영상`}
                        style={mediaStyle}
                    />
                ) : (
                    <div className={styles.videoPlaceholder}>
                        <p>활성화된 CCTV가 없습니다</p>
                    </div>
                )}
                {showStatus && (
                    <div className={styles.videoStatus}>
                        <span>{aiStatusText}</span>
                        <span className={styles.statusGreen}>연결 상태: {connectionStatusText}</span>
                    </div>
                )}
            </div>

            {/* 하단 선택창: 내 웹캠 + 실시간 고속도로 CCTV */}
            {showCameraStrip && (
            <div className={styles.cameraSlider}>
                <button className={styles.slideBtn}><ChevronLeft size={24} /></button>
                <div className={styles.thumbList}>
                    {/* 1. 내 웹캠 (항상 첫 번째) */}
                    <div
                        className={`${styles.thumbItem} ${isWebcam ? styles.active : ""}`}
                        onClick={() => setIsWebcam(true)}
                    >
                        <div className={`${styles.thumbRect} ${styles.webcamThumb}`}>
                            <Video size={20} />
                        </div>
                        <span>내 웹캠</span>
                    </div>

                    {/* 2. 실시간 고속도로 CCTV 목록 */}
                    {cameras.map(cam => (
                        <div
                            key={cam.cctv_no}
                            className={`${styles.thumbItem} ${!isWebcam && selected?.cctv_no === cam.cctv_no ? styles.active : ""}`}
                            onClick={() => { setIsWebcam(false); setSelected(cam); }}
                        >
                            <div className={styles.thumbRect}>
                                <Video size={18} style={{ color: "var(--text-muted, #94a3b8)" }} />
                                <button
                                    className={styles.deleteBtn}
                                    onClick={(e) => requestDelete(cam, e)}
                                    title="목록에서 삭제 (AI 분석도 중지됩니다)"
                                    aria-label="카메라 삭제"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                            <span>{cam.name}</span>
                        </div>
                    ))}
                </div>
                <button className={styles.slideBtn}><ChevronRight size={24} /></button>
            </div>
            )}

            {/* 카메라 삭제 확인 모달 — window.confirm() 대체 */}
            <ConfirmModal
                open={!!pendingDelete}
                title="카메라 삭제"
                message={
                    pendingDelete
                        ? `"${pendingDelete.name}" 카메라를 목록에서 삭제합니다.\nAI 분석도 함께 중지되며, 이 작업은 되돌릴 수 없습니다.`
                        : ""
                }
                confirmText="삭제"
                cancelText="취소"
                danger
                onConfirm={confirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        </div>
    );
}
