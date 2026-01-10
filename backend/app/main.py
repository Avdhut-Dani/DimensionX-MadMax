from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from captcha import verify_captcha
from analyze import analyze_text

app = FastAPI()

class AnalyzeRequest(BaseModel):
    text: str
    captcha: str | None = None

@app.post("/analyze")
def analyze(req: AnalyzeRequest):
    if req.captcha:
        if not verify_captcha(req.captcha):
            raise HTTPException(status_code=403, detail="Captcha failed")

    return analyze_text(req.text)
