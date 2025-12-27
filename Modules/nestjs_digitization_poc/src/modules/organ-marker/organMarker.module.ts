import { Module } from '@nestjs/common';
import { OrganMarkerService } from './organMarker.service';
import { OrganMarkerController } from './organMarker.controller';
import { CommonModule } from 'src/common/common.module';
import { DaoModule } from 'src/dao/dao.module';

@Module({
  providers: [OrganMarkerService],
  controllers: [OrganMarkerController],
  exports: [OrganMarkerService,],
  imports: [CommonModule,  DaoModule]
})
export class OrganMarkerModule {

}
