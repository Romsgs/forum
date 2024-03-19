// auth.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UserRepository } from 'src/user/user.repository';
import { verify } from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async login(email: string, password: string) {
    // Validate the user's credentials
    console.log('authService.login >> ', email, password);
    const user = await this.validateUser(email, password);
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  // Implement user validation logic
  private async validateUser(email: string, password: string) {
    try {
      const user = await this.userRepository.findUserByEmail(email);
      const passwordIsTrue = await verify(user.password, password);
      if (passwordIsTrue) {
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
