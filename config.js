// config.js
// Configuration for Telegram bot and capture interval

module.exports = {
  // Telegram bot token and chat ID are read from environment variables
  // This prevents exposing your token in code
  telegramToken: process.env.TELEGRAM_BOT_TOKEN,
  telegramChatId: process.env.TELEGRAM_CHAT_ID,

  // Interval in milliseconds for capturing webcam snapshots
  captureInterval: 3000
};
