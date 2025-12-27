import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import {DaoModule} from "../../dao/dao.module"
import { CommonModule } from 'src/common/common.module';
@Module({
  imports: [DaoModule,CommonModule, PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '3600s' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy,JwtStrategy],
})
export class AuthModule {}
