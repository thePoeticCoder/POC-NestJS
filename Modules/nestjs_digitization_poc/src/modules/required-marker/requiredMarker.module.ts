import { Module } from '@nestjs/common';
import { RequiredMarkerService } from './requiredMarker.service';
import { RequiredMarkerController } from './requiredMarker.controller';
import { CommonModule } from 'src/common/common.module';
import { DaoModule } from 'src/dao/dao.module';

@Module({
  providers: [RequiredMarkerService],
  controllers: [RequiredMarkerController],
  exports:[RequiredMarkerService],
  imports:[CommonModule,DaoModule]
})
export class RequiredMarkerModule {}

