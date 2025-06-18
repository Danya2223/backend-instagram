import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostShema } from './schema/post.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: Posts.name, schema: PostShema}])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
