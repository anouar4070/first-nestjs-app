import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsMiddleware } from './posts.middleware';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(PostsMiddleware).forRoutes('posts')
    //consumer.apply(PostsMiddleware).forRoutes({path: "posts", method: RequestMethod.GET});
    //consumer.apply(PostsMiddleware).exclude('posts');
    consumer
      .apply(PostsMiddleware)
      // .exclude(
      //   {
      //     path: 'posts/:id',
      //     method: RequestMethod.GET,
      //   },
      //   {
      //     path: 'posts/:id',
      //     method: RequestMethod.DELETE,
      //   },
      // )
      // .forRoutes('posts');
      .exclude(
        {
          path: 'posts',
          method: RequestMethod.POST,
        },
        'posts/(.*)',
      )
      .forRoutes(PostsController);
  }
}
