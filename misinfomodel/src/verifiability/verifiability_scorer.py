import re

VAGUE_PHRASES = [
    "many experts",
    "experts say",
    "people say",
    "many believe",
    "some believe",
    "it is believed",
    "reports suggest"
]

SPECULATIVE_WORDS = [
    "may",
    "might",
    "could",
    "will",
    "would"
]

def score_verifiability(claim: str) -> dict:
    score = 0.6  # neutral starting point
    reasons = []

    text = claim.lower()

    # Penalize vague attribution
    for phrase in VAGUE_PHRASES:
        if phrase in text:
            score -= 0.3
            reasons.append(f"vague attribution: '{phrase}'")
            break

    # Penalize speculation
    for word in SPECULATIVE_WORDS:
        if re.search(rf"\b{word}\b", text):
            score -= 0.2
            reasons.append(f"speculative wording: '{word}'")
            break

    # Reward concrete indicators
    if re.search(r"\b\d{4}\b", text):
        score += 0.3
        reasons.append("contains concrete date")

    if any(word in text for word in ["study", "data", "evidence", "report"]):
        score += 0.2
        reasons.append("references evidence")

    # Clamp score between 0 and 1
    score = max(0.0, min(1.0, score))

    return {
        "verifiability_score": round(score, 2),
        "reasons": reasons
    }
