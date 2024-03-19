import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    // Validate user credentials
    const accessToken = await this.authService.login(email, password);
    // Generate JWT token

    // Return JWT token to the client
    return { accessToken };
  }
}
