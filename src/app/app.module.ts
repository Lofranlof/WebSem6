import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './app.interceptors';
import { UserModule } from '../user/user.module';
import { AchievementModule } from '../achievement/achievement.module';
import { RecordModule } from '../record/record.module';
import { StatisticsModule } from '../statistics/statistics.module';
import { TypeModule } from '../type/type.module';
import { PrismaModule } from "../prisma/prisma.module";
import { AuthMiddleware } from 'src/auth/auth-middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    UserModule,
    AchievementModule,
    RecordModule,
    StatisticsModule,
    TypeModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      { path: '/profile', method: RequestMethod.ALL },
      { path: '/scoreboard', method: RequestMethod.ALL },
      { path: '/achievements', method: RequestMethod.ALL },
      { path: '/resources', method: RequestMethod.ALL },
      { path: '/todo', method: RequestMethod.ALL });
  }
}