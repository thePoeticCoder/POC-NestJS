import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { DaoModule } from 'src/dao/dao.module';
import { TestTypeController } from './testType.controller';
import { TestTypeService } from './testType.service';

@Module({
  controllers: [TestTypeController],
  providers:[TestTypeService],
  exports:[TestTypeService],
  imports:[CommonModule,DaoModule]
})
export class TestTypeModule {}
