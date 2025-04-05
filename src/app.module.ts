import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ChatModule } from './chat/chat.module';
import { PostsModule } from './posts/posts.module';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';


@Module({
  imports: [UsersModule, ProductsModule, ChatModule, PostsModule],
  controllers: [],
  providers: [],
  exports: []
  
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
