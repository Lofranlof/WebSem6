import {
  Injectable,
  NestMiddleware,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';
import firebaseConfig from './firebase-config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private auth: firebase.auth.Auth;

  constructor() {
    try {
      const firebaseAdmin = firebase.initializeApp(
        {
          credential: firebase.credential.cert(firebaseConfig),
        },
        'firebase-admin',
      );
      this.auth = firebaseAdmin.auth();
    } catch (error) {
      console.log(error);
    }
  }

  async use(req: Request, res: Response, next: NextFunction) {
    console.log(this.auth)
    try {
      if (req.cookies == null) {
        throw new UnauthorizedException();
      }
      const token = req.cookies['api_token'];
      if (token == null || token == '') {
        throw new UnauthorizedException();
      }
      await this.auth.verifyIdToken(token, true);
      next();
    } catch (error) {
      this.accessDenied(req, res);
    }
  }

  private accessDenied(req: Request, res: Response) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: HttpStatus.UNAUTHORIZED,
      timestamp: new Date().toISOString(),
      path: req.url,
      message: 'Access denied',
    });
  }
}