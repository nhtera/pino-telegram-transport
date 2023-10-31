import pino from "pino";

const transport = pino.transport({
  targets: [
    {
      target: "../src/index.ts",
      level: "error",
      options: {
        botToken: "YOUR_BOT_TOKEN",
        chatId: "YOUR_CHAT_ID",
        verbose: true, // Set to true if you want to log the entire JSON object
      },
    },
    {
      target: "pino-pretty",
      level: "debug",
      options: { destination: 1 },
    },
  ],
});

const now = new Date();

const logger = pino({ level: "debug" }, transport);

logger.debug("debug log!", now);
logger.info("info log!", now);
logger.error("error log!", now);
