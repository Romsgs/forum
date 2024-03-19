import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '../auth/jwt.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository, PrismaService, JwtService],
})
export class PostModule {}
