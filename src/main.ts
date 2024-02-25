import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'express-handlebars'
import { LoggingInterceptor } from './interceptors/app.interceptors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.engine('hbs', hbs.engine({
    extname: 'hbs',
    partialsDir: join(__dirname, '..', 'views/partials'), 
    defaultLayout: 'main',
    layoutsDir: join(__dirname, '..', 'views/layouts'),
  }));
  app.useGlobalInterceptors(new LoggingInterceptor())
  await app.listen(process.env.PORT || 34918);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
