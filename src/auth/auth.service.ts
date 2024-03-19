// auth.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UserRepository } from 'src/user/user.repository';
import { PasswordHash } from '../utils/passwordHash';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private passwordHash: PasswordHash,
  ) {}

  async login(email: string, password: string) {
    // Validate the user's credentials
    const user = await this.validateUser(email, password);

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  // Implement user validation logic
  private async validateUser(email: string, password: string) {
    try {
      const passwordToCompare = await this.passwordHash.hash(password);
      const user = await this.userRepository.testPasswordAndEmail(
        email,
        passwordToCompare,
      );

      if (user) {
        return user;
      } else {
        throw new HttpException(
          'Invalid email or password',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Authentication failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
