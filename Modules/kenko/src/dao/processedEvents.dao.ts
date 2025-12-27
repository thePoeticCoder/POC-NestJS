import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProcessedEventsDao {
  @Inject(PrismaService)
  private prisma: PrismaService;

  async create(data: Prisma.ProcessedEventsCreateInput) {
    const processedEvent = await this.prisma.processedEvents.create({
      data: data,
    });
    return processedEvent;
  }

  async findByLogIdAndEventName(logId: string, eventName: string) {
    const processedEvent = await this.prisma.processedEvents.findFirst({
      where: {
        logId,
        eventName,
      },
    });
    return processedEvent;
  }
  async clearDB() {
    const result = await this.prisma.processedEvents.deleteMany({});
    return result;
  }
}
