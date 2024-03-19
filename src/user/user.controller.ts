import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';
import { AUTHGuard } from 'src/auth/auth.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async addUser(
    @Body() createUserDto: { email: string; password: string; name?: string },
  ): Promise<User> {
    return this.userService.addUser(createUserDto);
  }

  @Get()
  async findMany() {
    return this.userService.findMany();
  }

  @Get('/email:email')
  async findUserByEmail(@Param('email') email: string): Promise<User> {
    console.log(email);
    return this.userService.findUserByEmail(email);
  }

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User> {
    console.log(id);
    return this.userService.findUserById(id);
  }

  @Put(':id')
  @UseGuards(AUTHGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserData: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserData);
  }

  @Delete(':id')
  @UseGuards(AUTHGuard)
  async deleteUserById(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUserById(id);
  }
}
