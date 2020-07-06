const { createLogger, format, transports } = require("winston");

const simpleTimestamp = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    simpleTimestamp
  ),
  defaultMeta: { service: "fifo" },
  transports: [new transports.Console()],
});

// if (process.env.NODE_ENV == "test") {
//   logger.add(
//     new transports.Console({
//       format: format.combine(
//         format.timestamp({
//           format: "YYYY-MM-DD HH:mm:ss",
//         }),
//         simpleTimestamp
//       ),
//     })
//   );
// }

module.exports = logger;
