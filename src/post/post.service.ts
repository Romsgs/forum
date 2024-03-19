import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async createPost(dataForPost: Prisma.PostCreateInput): Promise<Post> {
    return this.postRepository.createPost(dataForPost);
  }

  async findPostsByAuthorId(authorId: string): Promise<Post[]> {
    return this.postRepository.findPostbyauthorId(authorId);
  }

  async findPostsByTopicId(topicId: string): Promise<Post[]> {
    return this.postRepository.findPostbyTopicId(topicId);
  }

  async deletePost(id: string): Promise<Post> {
    return this.postRepository.deletePost(id);
  }
}
