# src/verdict/verdict_decider.py

def decide_verdict(verifiability_score, stance_result):
    supports = stance_result.get("supports", 0)
    refutes = stance_result.get("refutes", 0)
    neutral = stance_result.get("neutral", 0)

    total = supports + refutes + neutral

    # Safety fallback
    if total == 0:
        return {
            "verdict": "unsupported",
            "reason": "no usable evidence found"
        }

    # Strong refutation
    if refutes >= supports + 1 and refutes >= 2:
        return {
            "verdict": "false",
            "reason": "multiple sources refute the claim"
        }

    # Strong support
    if supports >= refutes + 1 and supports >= 2:
        return {
            "verdict": "true",
            "reason": "multiple sources support the claim"
        }

    # Weak or mixed evidence
    if verifiability_score < 0.4:
        return {
            "verdict": "unsupported",
            "reason": "claim is weakly verifiable"
        }

    # Everything else
    return {
        "verdict": "misleading",
        "reason": "evidence is mixed or inconclusive"
    }
