import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '../auth/jwt.service';
@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService, JwtService],
})
export class UserModule {}
