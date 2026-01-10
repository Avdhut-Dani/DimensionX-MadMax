import re

def clean_text(text: str) -> str:
    """
    Basic cleanup:
    - Remove extra whitespace
    - Remove weird characters
    """
    text = re.sub(r'\s+', ' ', text)
    text = text.strip()
    return text
