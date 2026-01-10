import os
import cv2
import numpy as np
from PIL import Image
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.requests import Request
from tensorflow.keras.models import load_model
from facenet_pytorch import MTCNN

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- Setup --------------------
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Load pretrained model
MODEL_PATH = "models/xception_deepfake_model.keras"
model = load_model(MODEL_PATH)

# MTCNN for face detection
mtcnn = MTCNN(keep_all=True)

# -------------------- Helper Functions --------------------
def preprocess_face(face_img):
    """Resize to 299x299 and normalize"""
    img = face_img.resize((299,299))
    img_array = np.array(img).astype("float32") / 255.0
    return np.expand_dims(img_array, axis=0)  # batch dimension

def predict_frame(frame):
    """Return fake probability of frame"""
    img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    boxes, _ = mtcnn.detect(img)
    if boxes is None:
        return 0  # No face detected
    x1, y1, x2, y2 = boxes[0]  # first face
    face = img.crop((x1, y1, x2, y2))
    face_tensor = preprocess_face(face)
    pred = model.predict(face_tensor)[0][0]
    return float(pred)

def analyze_video(video_path, frame_interval=5, segment_frames=30):
    """Analyze video and return segment-wise deepfake confidence"""
    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    current_segment = []
    segment_preds = []
    fps = cap.get(cv2.CAP_PROP_FPS) or 30

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        if frame_count % frame_interval == 0:
            fake_prob = predict_frame(frame)
            current_segment.append(fake_prob)
            if len(current_segment) >= segment_frames:
                segment_avg = float(np.mean(current_segment))
                segment_preds.append({
                    "start_time": (frame_count - segment_frames*frame_interval)/fps,
                    "end_time": frame_count/fps,
                    "confidence": segment_avg
                })
                current_segment = []
        frame_count += 1
    cap.release()

    overall_confidence = np.mean([s['confidence'] for s in segment_preds]) if segment_preds else 0
    overall_verdict = "Deepfake" if overall_confidence > 0.5 else "Real"

    return {
        "overall_verdict": overall_verdict,
        "overall_confidence": float(overall_confidence),
        "suspicious_segments": segment_preds
    }

# -------------------- Routes --------------------
@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/upload")
async def upload_video(file: UploadFile = File(...)):
    # Save uploaded video temporarily
    video_path = f"temp_{file.filename}"
    with open(video_path, "wb") as f:
        f.write(await file.read())
    
    # Analyze video
    result = analyze_video(video_path)

    # Clean up
    os.remove(video_path)
    return JSONResponse(content=result)