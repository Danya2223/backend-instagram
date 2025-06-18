import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { CommentesModule } from './commentes/commentes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [AuthModule, PostsModule, UsersModule, CommentesModule, LikesModule,MongooseModule.forRoot('mongodb://localhost:27017/local')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
