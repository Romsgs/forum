import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [AuthModule, UserModule, TopicModule],
  providers: [PrismaService],
})
export class AppModule {}
