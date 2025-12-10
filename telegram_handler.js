const TelegramBot = require("node-telegram-bot-api");
const { telegramToken } = require("./config");

const bot = new TelegramBot(telegramToken, { polling: true });

bot.on("message", msg => {
  bot.sendMessage(msg.chat.id, "Bot is active.");
});

module.exports = bot;
