import build from "pino-abstract-transport";
import TelegramBot from "node-telegram-bot-api";

export async function sendNotiToTelegram({
  botToken,
  chatId,
  text,
}: {
  botToken: string;
  chatId: string;
  text: string;
}) {
  const bot = new TelegramBot(botToken);
  try {
    await bot.sendMessage(chatId, text);
  } catch (e) {
    throw new Error(`${e}`);
  }
}

export default async function (opts: {
  botToken: string;
  chatId: string;
  verbose?: boolean;
}) {
  const { botToken, chatId, verbose = false } = opts;

  if (!botToken || !chatId) {
    throw new Error("The required options (botToken, chatId) are missing");
  }

  return build(async (source) => {
    for await (const obj of source) {
      const { time, level, msg, err, error, stack, ...props } = obj;
      const {
        message: errMessage,
        stack: errStack,
        ...errorProps
      } = err || error || {};

      await sendNotiToTelegram({
        botToken,
        chatId,
        text: verbose ? JSON.stringify(obj) : msg,
      });
    }
  });
}
