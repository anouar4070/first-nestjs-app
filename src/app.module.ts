import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ChatModule } from './chat/chat.module';
import { PostsModule } from './posts/posts.module';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';

@Module({
  imports: [UsersModule, ProductsModule, ChatModule, PostsModule],
  controllers: [],
  providers: [],
  exports: [],
})

//* using class middleware
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    // .forRoutes('*')
    .forRoutes({ path: '*', method: RequestMethod.ALL }); // ✅ Applied for all routes
  }
}

//* using functional middleware
// export class AppModule {}
