// src/topics/topic.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Topic, Prisma } from '@prisma/client';

@Injectable()
export class TopicRepository {
  constructor(private prisma: PrismaService) {}

  async createTopic(data: Prisma.TopicCreateInput): Promise<Topic> {
    try {
      return await this.prisma.topic.create({
        data,
      });
    } catch (error) {
      throw new Error(`Could not create topic: ${error.message}`);
    }
  }
  async findAllTopics() {
    try {
      return await this.prisma.topic.findMany();
    } catch (error) {
      throw new Error(`Could not find topics ${error.message}`);
    }
  }

  async findTopicById(id: string): Promise<Topic | null> {
    try {
      return await this.prisma.topic.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Could not find topic by ID: ${error.message}`);
    }
  }
  async findTopicByOwner(owner: string): Promise<Topic[]> {
    try {
      const topicsWithPosts = await this.prisma.topic.findMany({
        where: { authorId: owner },
        include: { posts: true }, // Include related posts in the query
      });
      return topicsWithPosts;
    } catch (error) {
      throw new Error(`Could not find topics by Owner: ${error.message}`);
    }
  }

  async updateTopic(id: string, data: Prisma.TopicUpdateInput): Promise<Topic> {
    try {
      return await this.prisma.topic.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error(`Could not update topic: ${error.message}`);
    }
  }

  async deleteTopic(id: string): Promise<Topic> {
    try {
      return await this.prisma.topic.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Could not delete topic: ${error.message}`);
    }
  }
}
