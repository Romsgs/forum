import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { Topic, Prisma } from '@prisma/client';
import { AUTHGuard } from 'src/auth/auth.guard';
// interface iBodyCreateTopic {
//   title: string;
//   owner?: Prisma.UserCreateNestedOneWithoutTopicsInput;
// }

@Controller('topic')
export class TopicController {
  constructor(private topicService: TopicService) {}

  @Post()
  @UseGuards(AUTHGuard)
  async createTopic(@Body() data: Prisma.TopicCreateInput): Promise<Topic> {
    // to make the request on insomina, "owner" field mus be a object with "connect" object with owners id:
    //JSON
    // {
    //   "title": "Topic 3",
    //   "owner": { "connect": { "id": "65f906417108d707e7273ed3" } }
    // }
    return this.topicService.createTopic(data);
  }

  @Get()
  async findAllTopics(): Promise<Topic[]> {
    return this.topicService.findAllTopics();
  }

  @Get(':id')
  async findTopicById(@Param('id') id: string): Promise<Topic> {
    return this.topicService.findTopicById(id);
  }

  @Get('/owner/:ownerId')
  async findTopicByOwner(@Param('ownerId') ownerId: string): Promise<Topic[]> {
    return this.topicService.findTopicByOwner(ownerId);
  }

  @Put(':id')
  async updateTopicById(
    @Param('id') id: string,
    @Body() data: Prisma.TopicUpdateInput,
  ): Promise<Topic> {
    return this.topicService.updateTopicById(id, data);
  }

  @Delete(':id')
  @UseGuards(AUTHGuard)
  async deleteTopic(@Param('id') id: string): Promise<Topic> {
    return this.topicService.deleteTopic(id);
  }
}
