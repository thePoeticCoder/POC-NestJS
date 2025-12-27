import { Services } from '@kenko-health/shared';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  AmqpConnectionManager,
  ChannelWrapper,
  connect,
} from 'amqp-connection-manager';
import { AppConfig } from '../../config';
import { QueueConstants } from '../../constants/appConstants';
import { ErrorHandlerService } from '../services/errorHandler.service';
import { LogService } from '../services/log.service';
const RMQ_CONNECTION_STR = AppConfig.rabbitmqConnString;
export const EVENT_DESTINATIONS = [
  Services.KWB,
  Services.CRM,
  Services.SCHEDULER,
  Services.NOTIFICATION,
];
export let _channel: ChannelWrapper;

@Injectable()
export class QueueFactoryService {
  private connection: AmqpConnectionManager;

  @Inject()
  private logService: LogService;

  @Inject()
  private errorHandlerService: ErrorHandlerService;

  constructor() {
    setTimeout(() => {
      this.connectToQueues();
    }, 2 * 1000);
  }

  async connectToQueues() {
    this.connection = await connect([RMQ_CONNECTION_STR]);
    this.connection.on('connect', async () => {
      await this.createChannel();
      // console.log("Connected to queue !!");
      this.logService.info('start', `Connected to queue !!`);
    });

    this.connection.on('disconnect', (e: any) =>
      this.printQueueDisconnectionLog(e),
    );
  }

  async createChannel() {
    // console.log(`inside createChannel`);
    this.logService.info('start', `inside createChannel`);

    _channel = await this.connection.createChannel({
      json: true,
      setup: async (_channel: any) => {
        await _channel.assertExchange(
          QueueConstants.PAYMENT_SERVICE_EXCHANGE_NAME,
          'topic',
          {
            durable: true,
          },
        );
        await this.bindQueues();
      },
    });
  }

  async bindQueues() {
    // console.log(`inside bindQueues`);
    this.logService.info('start', `inside bindQueues`);

    await this.bindToQueuesToProduceTo();
    // console.log(`successfully executed bindQueues !!`);
    this.logService.info('start', `successfully executed bindQueues !!`);
  }

  async bindToQueuesToProduceTo() {
    // console.log(`inside bindToQueuesToProduceTo`);
    this.logService.info('start', `inside bindToQueuesToProduceTo`);

    for (const destination of EVENT_DESTINATIONS) {
      // STEP-1 : Create queue
      const queueName = `${AppConfig.appName}.${destination}`;
      await _channel.assertQueue(queueName, { exclusive: false });

      //STEP-2 : Create Bindings keys
      const bindingKeyAll = `${AppConfig.appName}`;
      const bindingKeyDestination = `${bindingKeyAll}.${destination}`;

      //STEP-3 : bind queues to exchange Bindings keys
      this.logService.info('start', `binding to queue=[${queueName}]`);

      await _channel.bindQueue(
        queueName,
        QueueConstants.PAYMENT_SERVICE_EXCHANGE_NAME,
        bindingKeyAll,
      );
      await _channel.bindQueue(
        queueName,
        QueueConstants.PAYMENT_SERVICE_EXCHANGE_NAME,
        bindingKeyDestination,
      );
    }
    this.logService.info(
      'start',
      `successfully executed bindToQueuesToProduceTo !!`,
    );
  }

  //on disconnection
  async disconnectQueues() {
    this.logService.info('n/a', `inside disconnectQueues`);

    if (_channel) await _channel.close();
    if (this.connection) await this.connection.close();
    this.logService.info('n/a', `rabbitmq disconnected`);
  }

  getChannel(ctxId: string) {
    try {
      this.logService.info(ctxId, `inside getChannel`);
      return _channel;
    } catch (e) {
      this.errorHandlerService.handleError(e, ctxId, {
        sendErrorNotification: true,
        methodName: 'getChannel',
      });
      throw new NotFoundException(`_channel not found`);
    }
  }

  printQueueDisconnectionLog(e: any) {
    console.log(
      `inside printQueueDisconnectionLog , Disconnected from queue !!`,
    );

    const { err } = e;
    if (err) {
      const { code, errono, hostname, isOperational, message, name, syscall } =
        err;
      console.log(`we have a REASON`);
      console.log(
        `message=[${message}] , code=[${code}] , errono=[${errono}] , hostname=[${hostname}] , name=[${name}] , isOperational=[${isOperational}] , syscall=[${syscall}]`,
      );
    }
  }
}
