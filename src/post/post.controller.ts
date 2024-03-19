import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity, Prisma } from '@prisma/client';
import { AUTHGuard } from 'src/auth/auth.guard';
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseGuards(AUTHGuard)
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
  @UseGuards(AUTHGuard)
  async deletePost(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.deletePost(id);
  }
}
