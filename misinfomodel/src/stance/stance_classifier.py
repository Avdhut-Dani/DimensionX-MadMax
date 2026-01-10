from transformers import pipeline

# Pretrained NLI model
nli = pipeline(
    "text-classification",
    model="facebook/bart-large-mnli"
)

def classify_stance(claim, evidence_sentences):
    results = {
        "supports": 0,
        "refutes": 0,
        "neutral": 0
    }

    for sent in evidence_sentences:
        pair = f"{claim} </s> {sent}"
        output = nli(pair, truncation=True)[0]
        label = output["label"].lower()

        if label == "entailment":
            results["supports"] += 1
        elif label == "contradiction":
            results["refutes"] += 1
        else:
            results["neutral"] += 1

    return results
