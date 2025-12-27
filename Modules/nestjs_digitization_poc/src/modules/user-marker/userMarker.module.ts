import { Module } from '@nestjs/common';
import { UserMarkerService } from './userMarker.service';
import { UserMarkerController } from './userMarker.controller';
import { CommonModule } from 'src/common/common.module';
import { DaoModule } from 'src/dao/dao.module';


@Module({
  providers: [UserMarkerService],
  controllers: [UserMarkerController],
  exports:[UserMarkerService],
  imports:[CommonModule,DaoModule]

})
export class UserMarkerModule {}
