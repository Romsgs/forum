import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post, Prisma } from '@prisma/client';
@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}
  async createPost(dataForPost: Prisma.PostCreateInput): Promise<Post> {
    return await this.prisma.post.create({ data: dataForPost });
  }
  async findPostbyauthorId(authorId): Promise<Post[]> {
    return await this.prisma.post.findMany({ where: { authorId } });
  }
  async findPostbyTopicId(topicId): Promise<Post[]> {
    return await this.prisma.post.findMany({ where: { topicId } });
  }
  async deletePost(id: string): Promise<Post> {
    try {
      return await this.prisma.post.delete({
        where: { id },
      });
    } catch (error: any) {
      throw new Error(`Could not delete topic: ${error.message}`);
    }
  }
}
