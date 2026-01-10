import re
from typing import Dict, List

def analyze_text(text: str) -> Dict:
    """
    Core misinformation analysis logic.
    Replace internals with ML later.
    """

    claims = extract_claims(text)

    flags = []
    score = 100

    for claim in claims:
        if contains_absolute_language(claim):
            flags.append("Uses absolute or sensational language")
            score -= 15

        if contains_uncertain_source(claim):
            flags.append("Unverified or vague source")
            score -= 20

    score = max(score, 0)

    verdict = verdict_from_score(score)

    return {
        "overall_score": score,
        "claims": [
            {
                "text": claims[0] if claims else text,
                "verdict": verdict,
                "reason": verdict_reason(verdict),
                "stance": {
                    "supports": count_words(text, POSITIVE_WORDS),
                    "refutes": count_words(text, NEGATIVE_WORDS),
                    "neutral": count_words(text, NEUTRAL_WORDS),
                },
            }
        ],
        "flags": list(set(flags)),
    }


# ---------------- HELPERS ---------------- #

POSITIVE_WORDS = {"confirmed", "proven", "official", "verified"}
NEGATIVE_WORDS = {"fake", "hoax", "false", "debunked"}
NEUTRAL_WORDS = {"reported", "claimed", "said", "alleged"}

def extract_claims(text: str) -> List[str]:
    sentences = re.split(r'[.!?]\s+', text)
    return [s.strip() for s in sentences if len(s.strip()) > 20]

def contains_absolute_language(text: str) -> bool:
    return any(word in text.lower() for word in [
        "always", "never", "everyone", "nobody", "guaranteed"
    ])

def contains_uncertain_source(text: str) -> bool:
    return any(word in text.lower() for word in [
        "some people say", "sources say", "it is believed"
    ])

def verdict_from_score(score: int) -> str:
    if score > 75:
        return "LIKELY TRUE"
    if score > 40:
        return "MISLEADING"
    return "LIKELY FALSE"

def verdict_reason(verdict: str) -> str:
    return {
        "LIKELY TRUE": "No strong indicators of misinformation detected.",
        "MISLEADING": "Language or sourcing suggests possible distortion.",
        "LIKELY FALSE": "Multiple red flags indicate high misinformation risk.",
    }[verdict]

def count_words(text: str, vocab: set) -> int:
    words = text.lower().split()
    return sum(1 for w in words if w in vocab)
