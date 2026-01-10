import { WebSocketServer } from "ws";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const wss = new WebSocketServer({ port: 8080 });

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

wss.on("connection", (ws) => {
  console.log("🟢 MadMax stream connected");

  ws.on("message", async (data) => {
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `frames/${Date.now()}.webp`,
        Body: Buffer.from(data),
        ContentType: "image/webp"
      });

      await s3.send(command);
    } catch (err) {
      console.error("❌ S3 upload failed", err);
    }
  });

  ws.on("close", () => console.log("🔴 Stream disconnected"));
});

console.log("🚀 Receiver running on ws://localhost:8080");