import path from 'path';
import { format, createLogger, transports } from 'winston';

const { combine, timestamp } = format;

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), format.json()),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({
      filename: path.join(__dirname, '../../log/error.log'),
      level: 'error'
    }),
    new transports.File({
      filename: path.join(__dirname, '../../log/info.log'),
      level: 'info'
    }),
    new transports.File({
      filename: path.join(__dirname, '../../log/debug.log'),
      level: 'debug'
    })
  ]
});

// add morgan into winston
logger.stream = {
  write: function(message) {
    // do not show logs for static files
    // do not show HMR
    if (
      !/_next\/static\//.test(message) &&
      !/\/_next\/webpack-hmr/.test(message) &&
      !/\/_next\/on-demand-entries-ping/.test(message)
    ) {
      logger.debug(message.trim());
    }
  }
};

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      level: 'debug',
      format: combine(format.colorize(), format.simple())
    })
  );
}

export default logger;
