import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { PrismaService } from '../prisma/prisma.service';
import { TopicRepository } from './topic.repository';

@Module({
  controllers: [TopicController],
  providers: [TopicService, PrismaService, TopicRepository],
})
export class TopicModule {}
