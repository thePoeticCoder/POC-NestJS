import {Controller,Post,Body,UseGuards,Request,Inject } from "@nestjs/common"
import {LocalAuthGuard} from "./localAuth.guard"
import { AuthService } from "./auth.service"
import { CtxId } from "src/common/decorators/ctxId.decorator"
import { ApiResponse } from "src/providers/api-response"
import { JwtAuthGuard } from "./local.JWT.guard"
import { AuthGuard } from "@nestjs/passport";
import { MiscMessages,MiscCode } from "src/constants/appConstants"
@Controller("dataEntry")
export class AuthController {

    @Inject()
    private authService:AuthService

    @Post('data-entry-signup')
    async signUp(@Body() reqBody:any,@CtxId() ctxId:any){
        const signupRes=await this.authService.signUp(reqBody,ctxId)
        return new ApiResponse(signupRes,ctxId,"Success",201)
    }


    @UseGuards(LocalAuthGuard)
    @Post('data-entry-login')
    async login(@Request() req,@CtxId() ctxId:any){
        const res= await this.authService.login(req.user,ctxId)
        return new ApiResponse(res,ctxId,MiscMessages.SUCCESS,MiscCode.SUCCESS)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('data-entry-logout')
    async logOut(@Request() req,@CtxId() ctxId:any){
        const res= await this.authService.logOut(req.user.userId,ctxId)
        return new ApiResponse(res,ctxId,"Success",200)
    }
    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('data-entry-refresh')
    async refreshAccessToken(@Request() req,@CtxId() ctxId:any){
        const res= await this.authService.refreshAccessToken(req.user.userId,req.user.refreshToken,ctxId)
        return new ApiResponse(res,ctxId,"Success",200)
    }
}