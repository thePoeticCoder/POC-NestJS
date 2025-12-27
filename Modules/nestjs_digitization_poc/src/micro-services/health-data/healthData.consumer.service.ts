import { Inject, Injectable } from "@nestjs/common";
import { ChannelWrapper } from "amqp-connection-manager";
import { QueueFactoryService } from "../../common/queue/queueFactory.service";
import { ErrorHandlerService } from "../../common/services/errorHandler.service";
import { LogService } from "../../common/services/log.service";
import { ProcessedEventsDao } from "../../dao/processedEvents.dao";
import {QueueEventEnum,PendingTestValidityEnum,QueueConstants,MiscMessages} from "../../constants/appConstants"
import { TestsDao } from "src/dao/tests.dao";
import { WebhookService } from "src/webhook/webhook.service";
@Injectable()
export class HealthDataConsumerService {
  @Inject()
  private logService: LogService;


  @Inject()
  private queueFactory: QueueFactoryService;

  private channel: ChannelWrapper;

  @Inject()
  private testsDao:TestsDao
 
  @Inject()
  private webhookService:WebhookService

  @Inject()
  private processedEventsDao: ProcessedEventsDao;

  @Inject()
  private errorHandlerService:ErrorHandlerService;

  constructor() {
    setTimeout(() => {
      this.consumptionSetup();
    }, 8 * 1000);
  }

  consumptionSetup(): void {
    this.channel = this.queueFactory.getChannel();
    this.channel.waitForConnect().then(() => {
    this.channel.waitForConnect().then(() => {
        console.log("Listening for messages");
        this.channel.consume("QUEUE_DIGITIZATION2", this.handleEvents.bind(this));
        this.channel.consume(QueueConstants.QUEUE_HUBSPOT_DIGITIZATION2,this.handleEvents.bind(this))
      });
    });
    
  }



async handleEvents(data: any,) {
  // this.channel.ack(data);

    const message = JSON.parse(data.content.toString());
    const parsedData: any = JSON.parse(
        String.fromCharCode(...message.data)
        );
        
        const { 
            eventName,
            logId,
            data:ingestedData,
        } = parsedData;
        console.log(parsedData,"-------------------------------")
        this.logService.info("ctx",'parsedData =>',parsedData)
      
            const isEventExist = await this.processedEventsDao.findByLogIdAndEventName(logId,eventName);
            
            if (isEventExist) {
                
                  this.logService.info("ctx",`No operation as event =>[${eventName}] with this log id already exist`)
                this.channel.ack(data);  
                return MiscMessages.NO_OPERATION;
                
            }

    try {
      switch (eventName) {

        case QueueEventEnum.INGEST_PARTIAL_FROM_HEALTH_APP:
          await this.webhookService.processIngestedDataFromEvent(ingestedData,logId)          
        break;

        // case QueueEventEnum.UPDATE_PARTIAL_FROM_HEALTH_APP:
        //   // $log.info(`logId=[${ctx}] , preparing to ingest and update`);
        //   await this.ingestionService.partialUpdatePendingTest(ctx,parsedData);
        // break;

        case QueueEventEnum.UPDATE_CUSTOM_OBJECTID_FROM_CONSUMERAPP:
          await this.testsDao.updateManyTests({userHubspotId:ingestedData.hubspotId,validity: {in:[PendingTestValidityEnum.NEW,PendingTestValidityEnum.PARTIAL]}},{ticketId:ingestedData.ticketId})
          break
        }
        
      await this.processedEventsDao.create({
        logId,
        eventName,
      })
      this.channel.ack(data);      
    } 
    catch (e) {
      this.logService.error("ctx","error =>",e)
      const { message, error } = e;
      const errMsg = `logId=[${"ctx"}] , error in handle events`;
      this.errorHandlerService.handleError(`error while consuming event and the error is ${e.message} and event name is ${eventName}`, logId, {
        methodName: 'event-consumer',
        sendErrorNotification: true,
      });
      this.channel.nack(data);

    }
}
}
