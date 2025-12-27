import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { DaoModule } from 'src/dao/dao.module';
import { MetaDataController } from './metaData.controller';
import { MetaDataService } from './metaData.service';

@Module({
  controllers: [MetaDataController],
    providers: [MetaDataService],
    exports: [MetaDataService,],
    imports: [CommonModule,  DaoModule]
})
export class MetaDataModule {}
