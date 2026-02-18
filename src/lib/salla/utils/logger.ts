import pino from 'pino';
import EnvironmentConfig from '../config/environment';

const env = EnvironmentConfig.get();

const logger = pino({
  level: env.LOG_LEVEL,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  browser: {
    asObject: false,
  },
  ...(EnvironmentConfig.isDevelopment()
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
      }
    : {}),
});

export default logger;
