// jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { JwtStrategy as JwtBase } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends JwtBase {
  constructor() {
    super({
      jwtFromRequest: (req) => req.cookies.jwt, // or from headers, query parameters, etc.
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
