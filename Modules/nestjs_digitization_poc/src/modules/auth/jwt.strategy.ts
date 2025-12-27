import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import {Injectable} from "@nestjs/common"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){

    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.JWT_SECRET_KEY,
        });
      }

    async validate(payload: any) {
        return {username: payload.username,userId:payload.sub};
      }  
    

}

