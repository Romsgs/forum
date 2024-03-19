import { Injectable } from '@nestjs/common';
import { TopicRepository } from './topic.repository';
import { Topic, Prisma } from '@prisma/client';

@Injectable()
export class TopicService {
  constructor(private topicRepository: TopicRepository) {}
  async createTopic(data: Prisma.TopicCreateInput): Promise<Topic> {
    return this.topicRepository.createTopic(data);
  }
  async findAllTopics() {
    return this.topicRepository.findAllTopics();
  }
  async findTopicById(id: string) {
    return this.findTopicById(id);
  }
  async findTopicByOwner(owner: string) {
    return this.topicRepository.findTopicByOwner(owner);
  }
  async updateTopicById(
    id: string,
    data: Prisma.TopicUpdateInput,
  ): Promise<Topic> {
    return this.topicRepository.updateTopic(id, data);
  }
  async deleteTopic(id: string) {
    return this.topicRepository.deleteTopic(id);
  }
}
