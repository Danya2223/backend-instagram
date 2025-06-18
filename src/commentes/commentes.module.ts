import { Module } from '@nestjs/common';
import { CommentesService } from './commentes.service';
import { CommentesController } from './commentes.controller';

@Module({
  controllers: [CommentesController],
  providers: [CommentesService],
})
export class CommentesModule {}
