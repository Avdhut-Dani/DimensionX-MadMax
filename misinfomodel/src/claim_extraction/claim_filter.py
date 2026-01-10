# src/claim_extraction/claim_filter.py

import spacy

# Load small English model
nlp = spacy.load("en_core_web_sm")


def looks_like_factual_claim(sentence: str) -> bool:
    """
    Loosened rules for factual claims:
    - Include sentences with verbs (past or present)
    - OR sentences containing entities (PERSON, DATE, GPE, ORG, NORP, EVENT)
    - OR sentences containing numbers (for math or statistics)
    - OR sentences that are sufficiently long and punctuated like a statement
    """
    doc = nlp(sentence)

    # Check if sentence has any verbs
    has_verb = any(token.pos_ == "VERB" for token in doc)

    # Check if sentence contains named entities
    has_entity = any(
        ent.label_ in ("PERSON", "DATE", "GPE", "ORG", "NORP", "EVENT")
        for ent in doc.ents
    )

    # Check if sentence contains numbers
    has_number = any(token.like_num for token in doc)

    # Accept if it has a verb, entity, number, or is a long sentence
    return has_verb or has_entity or has_number or len(sentence.split()) > 3


def extract_claims(sentences: list) -> list:
    """
    Extract claims from a list of sentences.
    Each claim is returned as a dictionary with:
    - claim text
    - sentence index
    - confidence score (0.9 for now)
    """

    claims = []

    for i, sentence in enumerate(sentences):
        sentence = sentence.strip()
        if len(sentence) < 3:  # ignore tiny fragments
            continue

        if looks_like_factual_claim(sentence):
            claims.append({
                "claim": sentence,
                "sentence_id": i,
                "confidence": 0.9
            })

    return claims
