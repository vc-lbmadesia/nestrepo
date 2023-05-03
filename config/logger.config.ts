import { WinstonModuleOptions, utilities } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDailyRotate from 'winston-daily-rotate-file';
import * as AdmZip from 'adm-zip';
import * as path from 'path';
import { existsSync, unlinkSync } from 'fs';
import { Defaults } from './default.config';

export const winstonOptions = (): WinstonModuleOptions => {
  const logsFilePath = path.join(path.resolve(), `./logs/`);
  const dailyRotateTransport = new winstonDailyRotate({
    filename: logsFilePath + '%DATE%.log',
    datePattern: 'YYYY-MM-DD',
  });

  dailyRotateTransport.on('rotate', (oldFile: string) => {
    const zipFilePath = logsFilePath + Defaults.LOGS_ZIP_FILE;
    let zip = new AdmZip();
    if (existsSync(zipFilePath)) {
      zip = new AdmZip(logsFilePath + Defaults.LOGS_ZIP_FILE);
    }
    zip.addLocalFile(oldFile);
    zip.writeZip(zipFilePath);
    unlinkSync(oldFile);
  });

  return {
    exitOnError: false,
    level: 'debug',
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      winston.format.json(),
    ),
    transports: [
      new winston.transports.File({ filename: process.env.COMBINED_LOG_PATH, maxsize: 1048576 }),
      new winston.transports.File({ filename: process.env.ERROR_LOG_PATH, level: 'error', maxsize: 8388608 }),
      dailyRotateTransport,
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          utilities.format.nestLike('Social Cloud', { colors: true, prettyPrint: false }),
        ),
      }),
    ],
  };
};
