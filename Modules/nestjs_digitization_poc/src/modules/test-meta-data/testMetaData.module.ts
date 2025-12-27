import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { DaoModule } from 'src/dao/dao.module';
import { TestMetaDataController } from './testMetaData.controller';
import { TestMetaDataService } from './testMetaData.service';

@Module({
  controllers: [TestMetaDataController],
  providers: [TestMetaDataService],
  exports: [TestMetaDataService],
    imports: [CommonModule,  DaoModule]
})
export class TestMetaDataModule {}
