import requests
import os

SECRET = os.getenv("RECAPTCHA_SECRET_KEY")

def verify_captcha(token: str) -> bool:
    r = requests.post(
        "https://www.google.com/recaptcha/api/siteverify",
        data={
            "secret": SECRET,
            "response": token
        }
    )
    return r.json().get("success", False)
