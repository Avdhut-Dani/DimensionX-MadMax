import wikipedia
from sentence_transformers import SentenceTransformer, util

# Load once
embedder = SentenceTransformer("all-MiniLM-L6-v2")

def retrieve_evidence(claim, top_k=5):
    """
    Search Wikipedia and return top relevant sentences
    """
    try:
        search_results = wikipedia.search(claim, results=3)
    except Exception:
        return []

    sentences = []

    for title in search_results:
        try:
            page = wikipedia.page(title, auto_suggest=False)
            content = page.content
            for sent in content.split("."):
                if len(sent.strip()) > 40:
                    sentences.append(sent.strip())
        except Exception:
            continue

    if not sentences:
        return []

    # Rank by semantic similarity
    claim_emb = embedder.encode(claim, convert_to_tensor=True)
    sent_embs = embedder.encode(sentences, convert_to_tensor=True)

    scores = util.cos_sim(claim_emb, sent_embs)[0]
    top_indices = scores.argsort(descending=True)[:top_k]

    return [sentences[i] for i in top_indices]
