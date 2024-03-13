import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

const testLogin = false;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIndex(@Res() res: Response) {
    return res.render('index', {
      headerText: 'Welcome to YeahBuddy!',
      title: 'General',
      isLoggedIn: testLogin,
    });
  }

  @Get('achievements')
  getAchievements(@Res() res: Response) {
    return res.render('achievements', {
      headerText: 'Achievements',
      title: 'Achievements',
      isLoggedIn: testLogin,
    });
  }

  @Get('profile')
  getProfile(@Res() res: Response) {
    return res.render('profile', {
      headerText: 'Profile',
      title: 'Profile',
      isLoggedIn: true,
    });
  }

  @Get('scoreboard')
  getScoreboard(@Res() res: Response) {
    return res.render('scoreboard', {
      headerText: 'Scoreboard',
      title: 'Scoreboard',
      isLoggedIn: testLogin,
    });
  }

  @Get('todo')
  getToDo(@Res() res: Response) {
    return res.render('todo', {
      headerText: 'ToDo List',
      title: 'ToDo',
      isLoggedIn: testLogin,
    });
  }

  @Get('resources')
  getResources(@Res() res: Response) {
    return res.render('resources', {
      headerText: 'Resources',
      title: 'Resources',
      isLoggedIn: testLogin,
    });
  }

  @Get('login')
  getLogin(@Res() res: Response) {
    return res.render('login', {
      headerText: 'Login',
      title: 'login',
      isLoggedIn: false,
    });
  }
}
