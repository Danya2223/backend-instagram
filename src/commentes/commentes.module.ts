import { Module } from '@nestjs/common';
import { CommentesService } from './commentes.service';
import { CommentesController } from './commentes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comments, CommentsShema } from './schema/comment.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: Comments.name, schema: CommentsShema}])],
  controllers: [CommentesController],
  providers: [CommentesService],
})
export class CommentesModule {}
