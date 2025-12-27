import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProcessedEventsDao {
  @Inject(PrismaService)
  private prisma: PrismaService;

  @Inject()
  private helperErrorHandler:helperErrorHandlerService;

  async create(data: Prisma.ProcessedEventsCreateInput) {
    try{
    const processedEvent = await this.prisma.processedEvents.create({
      data: data,
    });
    return processedEvent;
    }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"create");
        }
  }

  async findByLogIdAndEventName(logId: string, eventName: string) {
    try{
    const processedEvent = await this.prisma.processedEvents.findFirst({
      where: {
        logId,
        eventName,
      },
    });
    return processedEvent;
    }catch(err){
          this.helperErrorHandler.throwErrorAndException(err,"findByLogIdAndEventName");
        }
  }
}
