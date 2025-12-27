import { Body, Controller, Inject, Post, Query, Req,Get, UseGuards } from "@nestjs/common";
import {  CtxId, } from '../../common/decorators/ctxId.decorator';
import { TestsService } from "./tests.service";
import {WebhookService} from "../../webhook/webhook.service"
import { ApiResponse } from 'src/providers/api-response';
import { AuthGuard } from "@nestjs/passport";
import {MannualTest,TestsQueryParams,TestInputs,TestsBody,ApporveOrRejectBody } from "../../dto/tests.dto"
import { MiscCode, MiscMessages } from 'src/constants/appConstants';
@Controller("test")
export class TestsController {
    
    @Inject()
    private testService:TestsService
    @Inject()
    private webhookService:WebhookService
  

    // @UseGuards(AuthGuard('jwt')) //add wrapper
    @Post("list-pending-tests")
    async pendingTests(@Body() body:any,@Query() query:any, @CtxId() ctxId: string, @Req() req:any ){
        const result =await this.testService.pendingTests(query,body,ctxId)
        return new ApiResponse(result,ctxId,"Success",200)
    }

    @Post("list-required-markers")
    async requiredMarkers(@Query('pendingTestId') pendingTestId:string, @CtxId() ctxId: string, ){
        const requiredMarkersResponse=await this.testService.requiredMarkers(pendingTestId,ctxId)
        return new ApiResponse(requiredMarkersResponse,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
    }
 // here body type givn as any but need to be specific so after pushing test schema into db prisma will gives types automatically we have to use that type here no need to write explicitly
    @Post("mannual-test")
    async processTest(@Body() body:MannualTest, @CtxId() ctxId: string,){
        const processTestResponse=await this.testService.processTest(body,"decodedtoken",ctxId)
        return new ApiResponse(processTestResponse,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
    }

    @Post("list-user-tests-for-qa")
    async userTestsForQa(@Query() query:TestsQueryParams,@Body() body:TestsBody, @CtxId() ctxId: string,){
        const userTestsForQaResponse=await this.testService.testsForQa(query,body,ctxId)
        return new ApiResponse(userTestsForQaResponse,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
    }
    @Post("approve-reject-test")
    async approveOrRejectUserTest(@Query('toDoStatus') toDoStatus:string,   @Body() body:ApporveOrRejectBody, @CtxId() ctxId: string,){
        const userTestsForQaResponse=await this.testService.approveOrRejectUserTest(body,{},toDoStatus,ctxId)
        return new ApiResponse(userTestsForQaResponse,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
    }

    @Get("fetch-user-test")
  async fetchUserTest (@Query() query : TestInputs,@CtxId() ctxId: string ) {
    const resp = await this.testService.fetchTestForQa(query,ctxId);
    return new ApiResponse(resp,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
  }

  @Get("fetch-user-test")
  async testResults (@Query() query : TestInputs,@CtxId() ctxId: string) {
    // return decoded;
    const resp = await this.testService.testResults(query,ctxId);
    return new ApiResponse(resp,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
  }
  
  // hubspot ingestion
    @Post("ingest")
    async hubspotIngestion(@Query("ingestReq") ingestReq:any,@Body() body:any, @CtxId() ctxId: string){
        const userTestsForQaResponse=await this.webhookService.hubspotIngestion(ingestReq,ctxId)
        return new ApiResponse(userTestsForQaResponse,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS);
    }
}