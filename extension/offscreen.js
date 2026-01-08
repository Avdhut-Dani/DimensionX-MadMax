let ws;
let running = false;

console.log("🧠 offscreen loaded");

async function startCapture(streamId) {
  if (running) return;
  running = true;

  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      mandatory: {
        chromeMediaSource: "tab",
        chromeMediaSourceId: streamId
      }
    },
    audio: false
  });

  const video = document.createElement("video");
  video.srcObject = stream;
  await video.play();

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  video.onloadedmetadata = () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  };

  ws = new WebSocket("ws://localhost:8080");
  ws.binaryType = "arraybuffer";

  const FPS = 10;

  ws.onopen = async () => {
    console.log("🔌 WS connected");

    while (running) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise(r =>
        canvas.toBlob(r, "image/webp", 0.7)
      );

      ws.send(blob);
      await new Promise(r => setTimeout(r, 1000 / FPS));
    }
  };
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "BEGIN_STREAM") {
    startCapture(msg.streamId);
  }
});

