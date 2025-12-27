import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ErrorHandlerService } from "./errorHandler.service";
import { LogService } from "./log.service";
@Injectable()
export class helperErrorHandlerService {
    @Inject()
    private errorHandlerService:ErrorHandlerService;
    @Inject()
    private logService:LogService;
    async notificationService(err:any,ctxId:string,methodName:string,sendErrorNotification:boolean,data:any){
        this.logService.error(ctxId,`${methodName} failed => [${data}]`);
        let e={
            message:"this request could not be proceed,check request body",
            error:err
        }
    this.errorHandlerService.handleError(e, ctxId, {
                methodName:methodName,
                sendErrorNotification: sendErrorNotification,
            });
            this.logService.error(ctxId,`${methodName} failed => [${data}]`);
    }

    async throwErrorAndException(err:any,serviceName:string){
            
            if (err instanceof Prisma.PrismaClientValidationError) {
            throw new Error(err.message)
            }

            if (err instanceof Prisma.PrismaClientKnownRequestError) {
            throw new Error(err.meta.target.toString())
            }
        throw new HttpException('Invalid Request ' + err, HttpStatus.BAD_REQUEST);
    }
}