import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { DaoModule } from 'src/dao/dao.module';
import { OrgansController } from './organs.controller';
import { OrgansService } from './organs.service';

@Module({
    controllers: [OrgansController],
    providers: [OrgansService],
    exports: [OrgansService,],
    imports: [CommonModule,  DaoModule]
})
export class OrgansModule {
}
