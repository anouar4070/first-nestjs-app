import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { AuthMiddleware } from './middlewares/auth/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* using functional middleware
  //app.use(AuthMiddleware);

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
