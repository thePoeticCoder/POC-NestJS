import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { Services } from '@kenko-health/shared';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { format } from 'winston';
import Console from 'winston-console-transport';
import { AppModule } from './app.module';
import { AppConfig } from './config';
const DailyRotateFile = require('winston-daily-rotate-file');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${Services.PAYMENT}] [${level}] [${message}]`;
});

async function bootstrap() {
  const appOptions = {
    cors: true,
    bufferLogs: true,
    logger: WinstonModule.createLogger({
      transports: [
        new DailyRotateFile({
          handleExceptions: true,
          filename: `logs/${Services.PAYMENT}-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '100m',
          JSON: true,
        }),
        new Console(),
      ],

      format: combine(timestamp(), myFormat),
    }),
  };

  //finally start the app
  const app = await NestFactory.create(AppModule, appOptions);
  app.setGlobalPrefix('/api/v2');
  app.useGlobalPipes(new ValidationPipe());
  app.use(morgan(':method :url :status :response-time ms'));
  //global-filters
  // app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(AppConfig.port);
}
bootstrap();
