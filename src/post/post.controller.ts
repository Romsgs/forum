import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity, Prisma } from '@prisma/client';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async createPost(
    @Body() dataForPost: Prisma.PostCreateInput,
  ): Promise<PostEntity> {
    return this.postService.createPost(dataForPost);
  }

  @Get('/author/:authorId')
  async findPostsByAuthorId(
    @Param('authorId') authorId: string,
  ): Promise<PostEntity[]> {
    return this.postService.findPostsByAuthorId(authorId);
  }

  @Get('/topic/:topicId')
  async findPostsByTopicId(
    @Param('topicId') topicId: string,
  ): Promise<PostEntity[]> {
    return this.postService.findPostsByTopicId(topicId);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.deletePost(id);
  }
}
