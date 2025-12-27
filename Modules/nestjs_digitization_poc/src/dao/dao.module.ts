import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProcessedEventsDao } from './processedEvents.dao';
import { OrgansDao } from './organs.dao';

import { TestTypeDao } from './testType.dao';
import { requiredMetaDataDao } from './requiredMetaData.dao';
import { TestMetaDataDao } from './testMetaData.dao';
import { UserMarkerDao } from './userMarkers.dao';
import { OrganMarkerDao } from './organMarker.dao';
import { RequiredOrganMarkerDao } from './requiredOrganMarker.dao';
import {MetaDataDao} from "./metaData.dao"
import {UsersDao} from "./users.dao"
import { TestsDao } from './tests.dao';
import {DiagnosisDao} from "./diagnosis.dao"
import {helperErrorHandlerService} from "../common/services/errorHandlerHelper.service"
import { ErrorHandlerService } from 'src/common/services/errorHandler.service';
import { LogService } from 'src/common/services/log.service';
@Module({
  imports: [PrismaService],
  exports: [ DiagnosisDao,ProcessedEventsDao,OrgansDao,TestTypeDao,requiredMetaDataDao,TestMetaDataDao,UserMarkerDao,OrganMarkerDao,RequiredOrganMarkerDao,UsersDao,TestsDao,MetaDataDao],
  providers: [PrismaService,ErrorHandlerService,LogService,helperErrorHandlerService, ProcessedEventsDao,OrgansDao,TestTypeDao,requiredMetaDataDao,TestMetaDataDao,UserMarkerDao,OrganMarkerDao,RequiredOrganMarkerDao,MetaDataDao,UsersDao,TestsDao,DiagnosisDao],
})
export class DaoModule {}
  