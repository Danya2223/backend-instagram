import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CommentesService } from './commentes.service';
import { CreateCommenteDto } from './dto/create-commente.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('commentes')
export class CommentesController {
  constructor(private readonly commentesService: CommentesService) { }


  @UseGuards(JwtAuthGuard)
  @Post('/posts/:postId/comments')
  createComment(@Param('postId') postId: string, @Body() createCommenteDto: CreateCommenteDto, @Req() req,
  ) {
    const user = req.user;
    return this.commentesService.createComment(createCommenteDto, postId, user.userId);
  }

  @Get(':postId/comments')
  getAllCommentsOfPost(@Param('postId') postId: string) {
    return this.commentesService.getAllCommentsOfPost(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':commentId')
  deleteComment(@Param('commentId') commentId: string ,@Req() req) {
    const user= req.user;
    return this.commentesService.deleteComment(commentId, user.userId);
  }
}
