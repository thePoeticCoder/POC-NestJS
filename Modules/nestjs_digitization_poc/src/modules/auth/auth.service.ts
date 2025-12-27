import { Injectable,Inject, HttpException, HttpStatus } from '@nestjs/common';
import {UsersDao} from "../../dao/users.dao"
import { JwtService, } from '@nestjs/jwt';
import { LogService } from "src/common/services/log.service";
import { EncryptionService } from 'src/common/services/encryption.service';
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
import { CtxId } from 'src/common/decorators/ctxId.decorator';

@Injectable()
export class AuthService {
  @Inject()
  private usersDao:UsersDao
  
  @Inject()
  private jwtService:JwtService
  
  @Inject(LogService)
  private logService:LogService

  @Inject()
  private encryptionService:EncryptionService

  @Inject()
  private helperErrorHandler:helperErrorHandlerService;

  async validateUser(username: string, pass: string,@CtxId() ctxId : string): Promise<any> {
    try{
    this.logService.info(ctxId,` inside try block of validateUser (method) AuthService (service)`,username);
    const user = await this.usersDao.findUser(username);
    const passwordMatched=await this.encryptionService.comparePassword(pass,user.password)
    if (!user && !passwordMatched){
      return null
    }
    return user;

    }catch(err){
            this.helperErrorHandler.notificationService(err,ctxId,"validateUser (method) AuthService (service)",true,"");
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
    }
  }

  async login(user:any,@CtxId() ctxId : string){
    try{
    this.logService.info(ctxId,` inside try block of login (method) AuthService (service)`,user);
    const {email ,id:userId}=user
    const payload={username:email,sub:userId}
    
    const [accessToken,refreshToken]= await Promise.all([
       this.jwtService.signAsync(payload,{secret:process.env.JWT_SECRET_KEY,expiresIn:60*60}), this.jwtService.signAsync(payload,{secret:process.env.REFRESH_JWT_SECRET_KEY,expiresIn:60*60*24*7})
    ])

    // store refreshtoken hash in db
    const cipherText=await this.encryptionService.encryptPassword(refreshToken)
    console.log(cipherText,"----------------")
    await this.usersDao.updateUserDetials({refreshToken:cipherText},userId)
    return {accessToken,refreshToken} 
    }catch(err){
        this.helperErrorHandler.notificationService(err,ctxId,"login (method) AuthService (service)",true,"");
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
    }
  }


  async signUp(body: any, ctxId: string) {
    const {userEmail, password} = body;
    const existingUser = await this.usersDao.findUser(userEmail);
    if (existingUser) {
        this.logService.error(ctxId,`USER ALREADY EXISTS`);
        throw new HttpException('USER ALREADY EXISTS', HttpStatus.FORBIDDEN);
          }

    try {
        const encryptedPassword = await this.encryptionService.encryptPassword(password) 
        return await this.usersDao.createUser({...body,password:encryptedPassword});
        
    }
    catch (err) {
          this.helperErrorHandler.notificationService(err,ctxId,"signUp (method) AuthService (service)",true,"");
            throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
    }
  }

  async logOut(id:string,ctxId:string){
    try{
      
      await this.usersDao.updateUserDetials({refreshToken:null},id)

    }catch(err){
      this.helperErrorHandler.notificationService(err,ctxId,"login (method) AuthService (service)",true,"");
      throw new HttpException('Invalid input ' + err, HttpStatus.BAD_REQUEST);
    }


  }

  async refreshAccessToken(userId:string,rt:string,ctxId){
    try{
      const refreshTokenHash=this.usersDao.getRefreshTokenHash(userId)

    }catch(e){

    }


  }
 
}