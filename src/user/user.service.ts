import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { hash } from 'argon2';
import { Prisma, User } from '@prisma/client';
interface iUserData {
  email: string;
  password: string;
  name?: string;
}

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  // Example: Service method to add a new user
  async addUser(createUserData: iUserData) {
    // Here, you could add business logic, like hashing the password
    console.log(createUserData);
    const hashedPassword = await hash(createUserData.password);
    console.log(hashedPassword);
    createUserData.password = hashedPassword;
    const newUser = await this.userRepository.createUser(createUserData);
    delete newUser.password;
    return newUser;
  }
  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findUserByEmail(email);
  }
  async findUserById(id: string): Promise<User> {
    return this.userRepository.findUserByEmail(id);
  }
  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.userRepository.updateUser(id, data);
  }
  async deleteUserById(id: string): Promise<User> {
    return this.userRepository.deleteUser(id);
  }
  async findMany() {
    const list = await this.userRepository.findAll();
    const listWithoutPassword = [];
    list.forEach((element) => {
      delete element.password;
      listWithoutPassword.push(element);
    });
    return listWithoutPassword;
  }
}
