import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/**
 * CheckAuthMiddleware checks
 * if in the session is stored
 * access token.
 */
@Injectable()
export class CheckAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!req.session.accessToken) {
      res.status(401).send({ message: 'Unauthorized' });
    }

    next();
  }
}
