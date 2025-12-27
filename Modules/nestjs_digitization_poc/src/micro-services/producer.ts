import {Injectable,Inject} from "@nestjs/common"
import {LogService} from "../common/services/log.service"
import { CommonService } from "src/common/services/common.service";
import {
    AmqpConnectionManager,
    ChannelWrapper,
    connect,
  } from 'amqp-connection-manager';
  import { ConfigService } from "@nestjs/config";
  const configService = new ConfigService();
  import { QueueConstants } from '../constants/appConstants';
import { ErrorHandlerService } from "../common/services/errorHandler.service";
  const EXCHANGE_NAME="kenko-exchange"
export const EVENT_DESTINATIONS = [
    {
      queueName: QueueConstants.QUEUE_HUBSPOT_DIGITIZATION, //queue for digitization--->hubspot
    },
  ];
@Injectable()
export class Producer{

  private channel: ChannelWrapper;

    private connection: AmqpConnectionManager;
    @Inject()
    private commonService:CommonService

    @Inject()
    private logService: LogService;

    
  @Inject()
  private configService: ConfigService;

    
  @Inject()
  private errorHandlerService:ErrorHandlerService;

    constructor() {
        setTimeout(() => {
          this.connectToQueues();
        }, 2 * 1000);
      }
    
       async connectToQueues() {
          this.connection = await connect([this.configService.get("rabbitmqUri")]);
          this.connection.on('connect', async () => {
              this.logService.info(
                'start',
                `connect to queues----------->`,
              );
            await this.createChannel();
             this.logService.info(
              'start',
              `Connected to queue !! *****`,
            );
            this.logService.info('start', `Connected to queue !!`);
          });
    
          this.connection.on('disconnect', (e: any) =>
            this.printQueueDisconnectionLog(e),
          );
        }
    
      async createChannel() {
        this.logService.info(
          'start',
          `inside createChannel !!`,
        );
        this.logService.info('start', `inside createChannel`);
    
        this.channel = await this.connection.createChannel({
          json: true,
          setup: async (_channel: any) => {
            await _channel.assertExchange(
              EXCHANGE_NAME,
              'direct',
              {
                durable: true,
              },
            );
            await this.bindQueues();
          },
        });
      }
    
        async bindQueues() {
           this.logService.info('start', `inside bindQueues`);
          this.logService.info('start', `inside bindQueues`);
          await this.bindToQueuesToProduceTo();
          this.logService.info('start', `successfully executed bindQueues !!`);
        }
    
      async bindToQueuesToProduceTo() {
        this.logService.info('start', `inside bindToQueuesToProduceTo`);
    
        for (const destination of EVENT_DESTINATIONS) {
        //   STEP-1 : Create queue
          const queueName = destination.queueName;
          await this.channel.assertQueue(queueName, { exclusive: false });
    
          //STEP-2 : Create Bindings keys
          //STEP-3 : bind queues to exchange Bindings keys
          this.logService.info('start', `binding to queue=[${queueName}]`);
    
          await this.channel.bindQueue(
            queueName,
            EXCHANGE_NAME,
            queueName, //quename and binding key are same
          );
    
        }
        this.logService.info(
          'start',
          `successfully executed bindToQueuesToProduceTo !!`,
        );
      }
    
    //    on disconnection
       async disconnectQueues() {
         this.logService.info('n/a', `inside disconnectQueues`);
         if (this.channel) await this.channel.close();
         if (this.connection) await this.connection.close();
         this.logService.info('n/a', `rabbitmq disconnected`);
       }
    
       printQueueDisconnectionLog(e: any) {
        
    this.logService.error(e, "inside printQueueDisconnectionLog , Disconnected from queue !!");
         const { err } = e;
         if (err) {
           const { code, errono, hostname, isOperational, message, name, syscall } =
             err;
             this.logService.error(e,"we have a REASON");
             this.logService.error(e,`message=[${message}] , code=[${code}] , errono=[${errono}] , hostname=[${hostname}] , name=[${name}] , isOperational=[${isOperational}] , syscall=[${syscall}]`);
         }
       }
    

    async sendDigitizationEvent(
        logId: string,
        eventName,
        queKey,
        data,
        
      ) {
        try {
          this.logService.info(logId, `inside postInvoiceCreationEvent...`);
      
          // const epoch = this.commonService.getCurrentEpoch(ctx);
          // const eventLogId = `${ctx}_${epoch}`;
      
          const event={
            logId,
            eventName,
            data
          }
      
          const dataToSend = Buffer.from(JSON.stringify(event));
      
          await this.channel.publish(
                QueueConstants.DIGITIZATION_EXCHANGE_NAME,
                QueueConstants.QUEUE_HUBSPOT_DIGITIZATION,
              dataToSend,
              {
                timeout: 1500,
              },
            );
            console.log("publisheddd")
         
        } catch (e) {
            this.errorHandlerService.handleError(e, logId, {
              methodName: 'sendDigitizationEvent',
              sendErrorNotification: true,
            });     
          }
      }
    
}