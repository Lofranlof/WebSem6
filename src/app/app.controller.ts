import { Controller, Get, HttpStatus, Post, Render, Req, Res, Session } from "@nestjs/common";
import { AppService } from './app.service';
import { Response } from 'express';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import session from "express-session";

const testLogin = false;

@Controller()
export class AppController {
  private firebaseApp: firebase.app.App;

  constructor(private readonly appService: AppService) {
    const firebaseConfig = {
      apiKey: process.env.APIKEY,
      authDomain: process.env.AUTHDOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGEBUCKET,
      messagingSenderId: process.env.MESSAGINGSENDERID,
      appId: process.env.APPID
    };
    try {
      this.firebaseApp = firebase.initializeApp(firebaseConfig);
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  getIndex(@Res() res: Response, @Session() session: Record<string, any>) {
    return res.render('index', {
      headerText: 'Welcome to YeahBuddy!',
      title: 'General',
      singedIn: session.userId != null,
    });
  }

  @Get('achievements')
  getAchievements(@Res() res: Response, @Session() session: Record<string, any>) {
    return res.render('achievements', {
      headerText: 'Achievements',
      title: 'Achievements',
      singedIn: session.userId != null,
    });
  }

  @Get('profile')
  getProfile(@Res() res: Response, @Session() session: Record<string, any>) {
    return res.render('profile', {
      headerText: 'Profile',
      title: 'Profile',
      singedIn: session.userId != null,
    });
  }

  @Get('scoreboard')
  getScoreboard(@Res() res: Response, @Session() session: Record<string, any>) {
    return res.render('scoreboard', {
      headerText: 'Scoreboard',
      title: 'Scoreboard',
      singedIn: session.userId != null,
    });
  }

  @Get('todo')
  getToDo(@Res() res: Response, @Session() session: Record<string, any>) {
    return res.render('todo', {
      headerText: 'ToDo List',
      title: 'ToDo',
      singedIn: session.userId != null,
    });
  }

  @Get('resources')
  getResources(@Res() res: Response, @Session() session: Record<string, any>) {
    return res.render('resources', {
      headerText: 'Resources',
      title: 'Resources',
      singedIn: session.userId != null,
    });
  }

  @Get('login')
  getLogin(@Res() res: Response, @Session() session: Record<string, any>) {
    return res.render('login', {
      headerText: 'Login',
      title: 'login',
      singedIn: session.userId != null,
    });
  }

  @ApiOperation({ summary: "login" })
  @ApiTags('API')
  @Post('login')
  async login(@Req() req: any, @Res() res: any, @Session() session: Record<string, any>) {
    try {
      const userData = await firebase
        .auth()
        .signInWithEmailAndPassword(req.body.email, req.body.password);
      session.userId = userData.user.uid;
      const tokenId = await userData.user.getIdToken();
      res.cookie('api_token', tokenId);
      return res.redirect('/profile');
    } catch (error) {
      console.log('Failed to sign in');
      res.status(HttpStatus.UNAUTHORIZED).render('login', {
        title: 'login',
        useCategoryCss: true,
        categoryCss: 'login.css',
        error: 'Не удалось войти! Попробуйте ещё раз.',
      });
    }
  }

  @ApiOperation({ summary: "sign in" })
  @ApiTags('API')
  @Post('register')
  async register(@Req() req: any, @Res() res: any,
                 @Session() session: Record<string, any>,
  ) {
    try {
      const userData = await firebase
        .auth()
        .createUserWithEmailAndPassword(req.body.email, req.body.password);
      session.userId = userData.user.uid;
      const tokenId = await userData.user.getIdToken();
      res.cookie('api_token', tokenId);
      return res.redirect('/profile');
    } catch (error) {
      console.log('Failed to sign in');
      res.status(HttpStatus.UNAUTHORIZED).render('login', {
        title: 'login',
        useCategoryCss: true,
        categoryCss: 'login.css',
        error: 'Не удалось войти! Попробуйте ещё раз.',
      });
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "log out" })
  @ApiTags('API')
  @Post('logout')
  async logout(@Res() res: any, @Session() session: Record<string, any>) {
    if (session.userId) {
      res.clearCookie('api_token');
      session.userId = null;
      return res.redirect('/profile');
    } else {
      return res.redirect('/');
    }
  }
}
