# 🛡️ Multi-Modal Cybersecurity Platform  
**Deepfake & Misinformation Detection**  
**Website + Chrome Extension** | Stranger Things–Themed

Real-time browser-level protection against AI-generated deepfakes and misinformation using custom ML models, OCR, cloud infrastructure, and contextual AI reasoning.

## 🌐 Live Components

- 🌍 **Web Application**
- 🧩 **Chrome Extension**
- 🧠 **AI Engines**
  - Deepfake Video Detection
  - Misinformation Detection (OCR + NLP)

## 📌 Project Overview

The explosive growth of AI-generated content has made it nearly impossible for regular users to distinguish truth from manipulation.

This project creates a **multi-modal, real-time defense layer** that protects users **directly in the browser** — where they are most exposed.

Combining custom ML models, cloud services, and Google technologies, it delivers instant, easy-to-understand verification without requiring any technical knowledge.

## ❓ Problem Statement

### The Challenge

- Explosion of AI deepfakes (videos, voice cloning, images)
- Visual misinformation spreads **much faster** than fact-checking
- Manual verification is:
  - Extremely slow
  - Fragmented across multiple tools
  - Not scalable for daily browsing
- Almost **no real-time protection** exists for average users

### Real-world Impact

- Destruction of public trust & digital identity
- Serious risks of:
  - Social manipulation
  - Financial fraud
  - Election interference
  - Personal & reputational damage

## 💡 Our Solution

### 🎥 Deepfake Detection Engine

- Frame-by-frame video analysis with custom trained models
- Detects synthetic artifacts & manipulation patterns
- Final video-level authenticity score & verdict

### 📰 Misinformation Detection Pipeline

- Accepts both text and image inputs
- OCR extraction for screenshots/non-selectable text
- NLP + credibility scoring
- Powered by **Gemini API** for deep contextual understanding

### 🧩 Real-time Browser Extension

- Captures content directly from the page
- Sends data to secure AWS-backed pipeline
- Instantly returns **Misinformation Index** + explanation

## ⚖️ Comparison with Existing Solutions

| Feature                  | Most Existing Tools                  | This Project                                      |
|--------------------------|--------------------------------------|---------------------------------------------------|
| Detection Type           | Single-modal (text or video)         | Multi-modal (text + video)                        |
| User Experience          | Separate websites/apps               | Seamless Website + Chrome Extension               |
| Security                 | Usually minimal/none                 | Firebase Auth + reCAPTCHA Enterprise              |
| Text Extraction          | Only copy-paste                      | Copy-paste + OCR (screenshots, images)            |
| AI Models                | Mostly static/pre-trained            | Gemini API + Custom fine-tuned models             |
| User Interface           | Generic & boring                     | Immersive Stranger Things themed UI               |

## ✨ Key Features

- 🧠 Multi-modal analysis (text + video)
- 🧩 Real-time detection while browsing
- 🔍 OCR support for non-selectable/locked content
- 🧪 Explainable results with reasoning
- 🤖 Advanced custom ML models (better accuracy)
- 🛡️ Secure & scalable cloud architecture

## 🛠️ Tech Stack

**Google Technologies**

- Firebase Authentication & Security
- Chrome Extension APIs
- Gemini API (contextual reasoning + chatbot)
- reCAPTCHA Enterprise

**Backend & Cloud**

- FastAPI (high-performance Python API)
- AWS S3 (secure storage for evidence & OCR images)
- Python 3.10+

**Frontend**

- React + Vite
- Modern, responsive design
- Stranger Things inspired theme

## 🏗️ High-Level Architecture
Browser (Web / Chrome Extension)
↓
FastAPI Gateway (single server)
↓
┌───────────────────────┐
│                       │
▼                       ▼
/misinfo             /deepfake
(OCR+NLP+Gemini)    (Video Analysis)
│                       │
└───────────┬───────────┘
↓
AWS S3
(Evidence & OCR storage)
text## 🧪 Local Development Setup

### Requirements

- Python **3.10.x** (exactly)
- Node.js **18+**
- npm **9+**
- Git

### Backend (FastAPI)

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo/backend

# Create & activate virtual environment
python3.10 -m venv venv
source venv/bin/activate          # Linux/macOS
# or
venv\Scripts\activate             # Windows

pip install -r requirements.txt

# Run server (both models)
uvicorn main:app --host 0.0.0.0 --port 8000
Important Endpoints

POST /deepfake/analyze
POST /misinfo/analyze

Frontend (React + Vite)
Bashcd frontend
npm install
npm run dev
# → http://localhost:5173
Chrome Extension

Go to chrome://extensions/
Turn on Developer mode
Click Load unpacked
Select the chrome-extension/ folder
Make sure backend is running on port 8000
```

🔐 Security Features

Firebase Authentication
reCAPTCHA Enterprise protection
Rate limiting on API endpoints
Secure evidence storage in AWS S3

🎯 Impact & Vision
Empower everyday users to consume digital content safely.
Prevent identity theft, viral fakes, and large-scale social engineering.
Future Plans

Multilingual misinformation detection
Audio deepfake detection
Firefox + Edge extension support
Personal threat analytics dashboard

📜 License
Educational / Research / Hackathon purposes
⭐ If you find this project interesting — please star the repository!
It helps spread awareness about responsible AI & cybersecurity.