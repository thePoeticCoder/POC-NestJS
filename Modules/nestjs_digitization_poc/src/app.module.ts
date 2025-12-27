import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { validate } from "./config/env.validation";
import configuration from "./config/env.variables";
import { ConfigModule } from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CtxIdMiddleware } from './common/middlewares/ctxId.midddleware';
import { CommonModule } from './common/common.module';
import { DaoModule } from './dao/dao.module';
import { OrgansModule } from './modules/organs/organs.module';
import { RequiredMarkerModule } from './modules/required-marker/requiredMarker.module';
import { TestTypeModule } from './modules/test-type/testType.module';
import { MetaDataModule } from './modules/required-meta-data/metaData.module';
import { TestMetaDataModule } from './modules/test-meta-data/testMetaData.module';
import { UserMarkerModule } from './modules/user-marker/userMarker.module';
import { OrganMarkerModule } from './modules/organ-marker/organMarker.module';
import {MicroServicesModule} from "./micro-services/microServices.module"
import { TestsModule } from './modules/tests/test.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ".env",
    validate,
    load: [configuration],
  }), MicroServicesModule,CommonModule, TestsModule,DaoModule,OrgansModule,RequiredMarkerModule,TestTypeModule,MetaDataModule,TestMetaDataModule,UserMarkerModule,OrganMarkerModule,AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(userContext: MiddlewareConsumer) {
    userContext
      .apply(CtxIdMiddleware)
      .forRoutes({ path: '/**', method: RequestMethod.ALL });
  }
}
