import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      // Check if a user with the provided email already exists
      const existingUser = await this.findUserByEmail(data.email);
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      // If user doesn't exist, create the new user
      return await this.prisma.user.create({
        data,
      });
    } catch (error: any) {
      throw new Error(`Could not create user: ${error.message}`);
    }
  }

  async findAll(): Promise<User[] | null> {
    try {
      return await this.prisma.user.findMany();
    } catch (error: any) {
      throw new Error(`Could not find user by email: ${error.message}`);
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error: any) {
      throw new Error(`Could not find user by email: ${error.message}`);
    }
  }

  async findUserById(id: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error: any) {
      throw new Error(`Could not find user by ID: ${error.message}`);
    }
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      throw new Error(`Could not update user: ${error.message}`);
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error: any) {
      throw new Error(`Could not delete user: ${error.message}`);
    }
  }
}
