import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secretKey = process.env.JWT_SECRET;

  sign(payload: any): string {
    return jwt.sign(payload, this.secretKey);
  }

  verify(token: string): any {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (e) {
      throw new HttpException('Invalid Access Token', HttpStatus.UNAUTHORIZED);
    }
  }
}
