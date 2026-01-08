let offscreenCreated = false;

chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg.type === "START_CAPTURE") {
    if (!offscreenCreated) {
      await chrome.offscreen.createDocument({
        url: "offscreen.html",
        reasons: ["USER_MEDIA"],
        justification: "Tab capture & frame processing"
      });
      offscreenCreated = true;
    }

    chrome.runtime.sendMessage({ type: "BEGIN_STREAM" });
  }
});
