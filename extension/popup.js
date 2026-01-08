document.getElementById("start").onclick = async () => {
  console.log("▶️ START clicked");

  // Create offscreen doc if not already present
  const exists = await chrome.offscreen.hasDocument();
  if (!exists) {
    await chrome.offscreen.createDocument({
      url: "offscreen.html",
      reasons: ["USER_MEDIA"],
      justification: "Tab capture"
    });
  }

  // Send message directly to offscreen
  chrome.runtime.sendMessage({
    type: "BEGIN_STREAM"
  });

  console.log("📤 BEGIN_STREAM sent to offscreen");
};
