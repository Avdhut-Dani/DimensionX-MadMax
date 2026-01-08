document.getElementById("start").onclick = () => {
  chrome.runtime.sendMessage({ type: "START_CAPTURE" });
};
