import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import {Injectable} from "@nestjs/common"
import { Request  } from "express";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy,'jwt-refresh'){

    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.REFRESH_JWT_SECRET_KEY,
        });
      }

    async validate(req:Request ,payload: any) {
        const refreshToken=req.get('authorization').split(" ")[1]
        return {username: payload.username,userId:payload.sub,refreshToken};
    }  
    

}

