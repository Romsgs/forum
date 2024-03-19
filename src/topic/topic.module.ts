import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { PrismaService } from '../prisma/prisma.service';
import { TopicRepository } from './topic.repository';
import { JwtService } from '../auth/jwt.service';

@Module({
  controllers: [TopicController],
  providers: [TopicService, PrismaService, TopicRepository, JwtService],
})
export class TopicModule {}
