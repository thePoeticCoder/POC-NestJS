import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  AmqpConnectionManager,
  ChannelWrapper,
  connect,
} from 'amqp-connection-manager';
import { ConfigService } from "@nestjs/config";
import { QueueConstants } from '../../constants/appConstants';
import { LogService } from '../services/log.service';
import { ErrorHandlerService } from '../../common/services/errorHandler.service';
const EXCHANGE_NAME="kenko-exchange"
export const EVENT_DESTINATIONS = [
  {
    queueName: QueueConstants.QUEUE_HUBSPOT_DIGITIZATION2, //queue for Hubspot--->Digitization
  },
  {
    queueName: QueueConstants.QUEUE_DIGITIZATION, //queue  healthdataapp--->Digitization
  },
];

@Injectable()
export class QueueFactoryService {
  private connection: AmqpConnectionManager;

  @Inject()
  private logService: LogService;

  @Inject()
  private configService: ConfigService;

  @Inject()
  private errorHandlerService:ErrorHandlerService;

  private channel: ChannelWrapper;

  constructor() {
    setTimeout(() => {
      this.connectToQueues();
    }, 2 * 1000);
  }


  async connectToQueues() {
    this.logService.info("rabbitmqUri---------------------------", this.configService.get("rabbitmqUri"));
    this.connection = await connect([this.configService.get("rabbitmqUri")]);
    this.connection.on("connect", async () => {
      await this.createChannel();
      this.logService.info("start", `Connected to queue !!`);
    });

    this.connection.on("disconnect", (e: any) => this.printQueueDisconnectionLog(e));
  }

  async createChannel() {
    this.logService.info("start", `inside createChannel`);

    this.channel = await this.connection.createChannel({
      json: true,
      setup: async (_channel: any) => {
        await _channel.assertExchange(EXCHANGE_NAME, "direct", {
          durable: true,
        });
        await this.bindQueues();
      },
    });
  
  }
  

  async bindQueues() {
    this.logService.info("start", `inside bindQueues`);

    await this.bindToQueuesToProduceTo();
    this.logService.info("start", `successfully executed bindQueues !!`);
  }

  async bindToQueuesToProduceTo() {
    this.logService.info("start", `inside bindToQueuesToProduceTo-------------------------------`);
    for (const destination of EVENT_DESTINATIONS) {
      // STEP-1 : Create queue
      await this.channel.assertQueue(destination.queueName, { exclusive: false});
      //STEP-2 : Create Bindings keys
      //STEP-3 : bind queues to exchange Bindings keys
      this.logService.info("start", `binding to queue=[${destination.queueName}]`);

      await this.channel.bindQueue(destination.queueName,EXCHANGE_NAME, destination.queueName);
    }
    this.logService.info("start", `successfully executed bindToQueuesToProduceTo !!`);
  }

  //on disconnection
  async disconnectQueues() {
    this.logService.info("n/a", `inside disconnectQueues`);

    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
    this.logService.info("n/a", `rabbitmq disconnected`);
  }

  getChannel() {
    try {
      return this.channel;
    } catch (e) {
      this.errorHandlerService.handleError(e, "context id is misssing", {
        sendErrorNotification: true,
        methodName: "getChannel",
      });
      throw new NotFoundException(`_channel not found`);
    }
  }

  printQueueDisconnectionLog(e: any) {
    this.logService.error(e, "inside printQueueDisconnectionLog , Disconnected from queue !!");
    const { err } = e;
    if (err) {
      const { code, errono, hostname, isOperational, message, name, syscall } = err;
    this.logService.error(e,"we have a REASON");
    this.logService.error(e,`message=[${message}] , code=[${code}] , errono=[${errono}] , hostname=[${hostname}] , name=[${name}] , isOperational=[${isOperational}] , syscall=[${syscall}]`);
    }
  }


}
