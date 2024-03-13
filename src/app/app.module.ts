import { Module } from '@nestjs/common';
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
export class AppModule {}
