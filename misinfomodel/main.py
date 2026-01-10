from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json

# === Pipeline imports ===
from src.preprocessing.text_cleaner import clean_text
from src.preprocessing.sentence_splitter import split_sentences
from src.claim_extraction.claim_filter import extract_claims
from src.verifiability.verifiability_scorer import score_verifiability
from src.stance.retriever import retrieve_evidence
from src.stance.stance_classifier import classify_stance
from src.verdict.verdict_decider import decide_verdict


# =========================
# FastAPI App
# =========================
app = FastAPI(
    title="Misinfo Detector API",
    version="0.1.0"
)

# =========================
# CORS (VERY IMPORTANT)
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# Request Schema
# =========================
class TextInput(BaseModel):
    text: str


# =========================
# API Endpoint
# =========================
@app.post("/analyze")
def analyze_text(payload: TextInput):
    raw_text = payload.text

    cleaned = clean_text(raw_text)
    sentences = split_sentences(cleaned)
    claims = extract_claims(sentences)

    final_claims = []

    for claim in claims:
        # Step 2: Verifiability
        verifiability = score_verifiability(claim["claim"])
        claim.update(verifiability)

        # Skip weak claims
        if claim["verifiability_score"] < 0.3:
            final_claims.append({
                "claim": claim["claim"],
                "verdict": "skipped",
                "reason": "low verifiability",
                "verifiability_score": claim["verifiability_score"],
            })
            continue

        # Step 3: Evidence + stance
        evidence = retrieve_evidence(claim["claim"])
        stance_result = classify_stance(claim["claim"], evidence)

        # Step 4: Verdict
        verdict = decide_verdict(
            claim["verifiability_score"],
            stance_result
        )

        final_claims.append({
            "claim": claim["claim"],
            "verdict": verdict["verdict"],
            "reason": verdict["reason"],
            "verifiability_score": claim["verifiability_score"],
            "stance": stance_result,
        })

    # Overall score (simple version)
    false_claims = sum(1 for c in final_claims if c["verdict"] == "false")
    overall_score = int((false_claims / max(len(final_claims), 1)) * 100)

    return {
        "claims": final_claims,
        "overall_score": overall_score,
        "flags": []
    }


# =========================
# Health Check
# =========================
@app.get("/")
def root():
    return {"status": "Misinfo Detector API running"}
