import { Topic, Post } from '@prisma/client';
export type TopicPostResponse = {
  topics: Topic[];
  posts: Post[];
};
