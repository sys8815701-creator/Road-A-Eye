# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Setup:**
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**Run development server:**
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**Tests** (pytest is not in requirements.txt — add it before running):
```bash
pytest                                        # all tests
pytest tests/unit/test_yolo.py               # single file
pytest tests/unit/test_yolo.py::test_name    # single test
pytest --cov=app tests/                      # with coverage
```

## Architecture

This is a **FastAPI ML inference service** for highway vehicle detection and classification. It combines YOLO (object detection) and Keras (classification) models with optional LLM/chat capabilities.

### Layers

- **`app/api/v1/`** — Route handlers per model type (keras, yolo, llm, chat). Keras also exposes a WebSocket endpoint (`/api/v1/keras/ws`) for real-time Base64 frame processing.
- **`app/modules/`** — One subdirectory per model (keras, yolo, llm, chat). Each contains a `service.py` (business logic), a detector/classifier, `schemas.py` (Pydantic I/O models), and `utils.py`.
- **`app/core/`** — App-wide config (`config.py` via Pydantic Settings + `.env`), security, and startup/shutdown lifecycle events.
- **`app/common/`** — Shared logger, custom exceptions and handlers, response formatting, and utility functions.
- **`app/infrastructure/`** — `model_registry.py` resolves model file paths by type/version; `storage.py` handles file uploads; `cache.py` wraps results.

### Data flow

```
HTTP/WS request → API route → Service → ML model (Keras/YOLO) → Response schema → Client
```

### Models directory

`models/` is structured by type and version (`models/keras/v1/`, `models/yolo/v1/`, etc.). The active version is controlled by env vars (e.g. `KERAS_MODEL_VERSION=v1`).

### Key env vars (`.env`)

| Variable | Purpose |
|---|---|
| `APP_NAME` | Display name |
| `DEBUG` | Enable debug mode |
| `KERAS_MODEL_VERSION` | Which Keras model version to load |
