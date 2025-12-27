import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CtxId } from 'src/common/decorators/ctxId.decorator';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string,@CtxId() ctxId : string): Promise<any> {
    const user = await this.authService.validateUser(username, password,ctxId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

}