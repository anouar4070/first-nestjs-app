//* class middleware
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    
    if (!req.headers.authorization) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Unauthorized' });
    }

    next();
  }
}

//* Functional middleware
// import { HttpStatus } from '@nestjs/common';
// import { Request, Response } from 'express';

// export function AuthMiddleware(req: Request, res: Response, next: () => void) {
//     if (!req.headers.authorization) {
//       return res
//         .status(HttpStatus.UNAUTHORIZED)
//         .json({ message: 'Unauthorized' });
//     }
//     next();
//   }
