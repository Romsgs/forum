// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends JWTStrategy {
  constructor() {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET,
      },
      async (payload, done) => {
        // Adicione o segundo argumento para a função de verificação (verify)
        try {
          // Validação opcional do payload do JWT
          const user = { userId: payload.sub, email: payload.email };
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      },
    );
  }
}
