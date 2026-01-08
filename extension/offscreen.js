let ws;

async function startCapture() {
  chrome.tabCapture.capture(
    { video: true, audio: false },
    (stream) => {
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ws = new WebSocket("ws://localhost:8080");

        ws.binaryType = "arraybuffer";

        const FPS = 10;

        setInterval(() => {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            (blob) => {
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(blob);
              }
            },
            "image/webp",
            0.7
          );
        }, 1000 / FPS);
      };
    }
  );
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "BEGIN_STREAM") {
    startCapture();
  }
});
