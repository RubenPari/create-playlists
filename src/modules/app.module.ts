import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CheckAuthMiddleware } from '../middlewares/check-auth/check-auth.middleware';
import { PlaylistModule } from './playlist/playlist.module';

@Module({
  imports: [AuthModule, PlaylistModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.GET },
        { path: 'auth/callback', method: RequestMethod.GET },
        { path: 'auth/logout', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
