console.log("🔥 MadMax SW booted");

const PROJECT_ID = "madmax-67ca2";

let offscreenCreated = false;

async function ensureOffscreen() {
  const exists = await chrome.offscreen.hasDocument();
  if (exists) return;

  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: ["USER_MEDIA"],
    justification: "Tab capture and frame streaming"
  });

  // 🔑 CRITICAL: give offscreen time to load
  await new Promise(resolve => setTimeout(resolve, 300));
}


async function fetchOverlayPermission(uid) {
  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/settings/${uid}`
    );

    if (!res.ok) return false;

    const data = await res.json();

    return data.fields?.overlay?.booleanValue === true;
  } catch (e) {
    console.error("❌ Firestore REST error", e);
    return false;
  }
}

async function handleUID(uid) {
  if (!uid) return;

  const allowed = await fetchOverlayPermission(uid);

  await chrome.storage.sync.set({ overlayAllowed: allowed });

  chrome.tabs.query({}, tabs => {
    tabs.forEach(tab => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
          type: "OVERLAY_PERMISSION",
          allowed
        });
      }
    });
  });
}

/* ================= LISTENERS ================= */

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("madmax_uid", ({ madmax_uid }) => {
    if (madmax_uid) handleUID(madmax_uid);
  });
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "PING") {
    console.log("👋 SW awake");
  }
});


chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.madmax_uid) {
    handleUID(changes.madmax_uid.newValue);
  }
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "STORE_UID" && msg.uid) {
    // Save UID and immediately fetch overlay permission
    chrome.storage.sync.set({ madmax_uid: msg.uid }, () => {
      handleUID(msg.uid); // fetch overlayAllowed and send message to tabs
    });
  }

  if (msg.type === "REFRESH_PERMISSION") {
    chrome.storage.sync.get("madmax_uid", ({ madmax_uid }) => {
      if (madmax_uid) handleUID(madmax_uid);
    });
  }
});

chrome.runtime.onMessage.addListener(async (msg, sender) => {
  if (msg.type === "START_CAPTURE") {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const streamId = await chrome.tabCapture.getMediaStreamId({
      targetTabId: tab.id
    });

    await ensureOffscreen();

    chrome.offscreen.sendMessage({
      type: "BEGIN_STREAM",
      streamId
    });
  }
});





