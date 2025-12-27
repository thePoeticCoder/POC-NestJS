import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { format } from 'winston';
import Console from 'winston-console-transport';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
const DailyRotateFile = require('winston-daily-rotate-file');
const { combine, timestamp, printf } = format;
const configService = new ConfigService();
const nodeEnv = configService.get("NODE_ENV");
console.log("NODE_ENV ----->", nodeEnv);
console.log("DATABASE_URL ----->", configService.get("DATABASE_URL"));

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [digitization] [${level}] [${message}]`;
});

async function bootstrap() {
  const appOptions = {
    cors: true,
    bufferLogs: true,
    logger: WinstonModule.createLogger({
      transports: [
        new DailyRotateFile({
          handleExceptions: true,
          filename: `logs/digitization-%DATE%.log`, // edit
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

  //await app.listen(AppConfig.port);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT, () =>
      console.log(`server running  ${process.env.PORT}`),
    );

}
bootstrap();
