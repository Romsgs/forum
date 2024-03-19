// auth.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';
@Injectable()
export class AUTHGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Extract the request object from the execution context
    const request = context.switchToHttp().getRequest();
    const user = this.jwtService.verify(request.rawHeaders[7].split(' ')[1]);
    // Check if the user is authenticated (for example, by checking JWT token)
    if (user) {
      // If the user is authenticated, allow the request to proceed
      return true;
    }

    // If the user is not authenticated, deny the request
    return false;
  }
}
