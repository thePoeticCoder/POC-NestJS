import { Inject, Injectable } from '@nestjs/common';
import {LogService} from '../common/services/log.service'
import {WebhookService} from '../webhook/webhook.service'
import {PendingTestValidityEnum,DigitisationStatusEnum,MiscMessages} from '../constants/appConstants'
import { TestsDao } from 'src/dao/tests.dao';
@Injectable()
export class ingestionService {

    @Inject(LogService)
    private logService:LogService

    @Inject(WebhookService)
    private webhookService:WebhookService


    @Inject()
    private testsDao:TestsDao
    async partialUpdatePendingTest ( ctx : string , parsedData : any ) {
        this.logService.info(ctx,`inside partialUpdatePendingTest`,parsedData);

        const { userHubspotId , userTestEntries,testType="PPMC" } = parsedData;

        // commented becuase we are not using this method at all----------------->
        // deprecate duplicates 
            // await this.webhookService.deprecateDuplicates(userHubspotId,"PPMC",ctx);
                    
        const ingestedUserTestEntries = await this.webhookService.mapIngestedTestsWithIds(userTestEntries,testType,ctx);
 
        const findOneCriteria = {
            userHubspotId ,
            validity : { $in : [ PendingTestValidityEnum.NEW ] }
        };

        this.logService.info(ctx,`findOneCriteria =>`,findOneCriteria);

        const updateCriteria = {
            validity : PendingTestValidityEnum.PARTIAL ,
            digitisationStatus : DigitisationStatusEnum.PARTIAL ,
            userTestEntries : ingestedUserTestEntries ,
            ingestedUserTestEntries 
        };

        this.logService.info(ctx,`updateCriteria =>`,updateCriteria);

        const updatedPendingtest = await this.testsDao.updateManyTests(findOneCriteria,updateCriteria);

        if (!updatedPendingtest) {
            this.logService.info(ctx,`cant find any test to update`);
            return MiscMessages.NO_OPERATION;
        }
        
        this.logService.info(ctx,`updated Pending Test =>`,updatedPendingtest);
        MiscMessages.SUCCESS ;

    }
}





