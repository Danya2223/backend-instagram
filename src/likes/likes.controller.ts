import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  async likeToPost(@Param('postId') postId: string, @Req() req: Request) {
    const user = req.user as any;
    return this.likesService.like(user.userId, postId);
  }

  @Get(':postId/likes/users')
  async getUsersWhoLiked(@Param('postId') postId: string) {
    return this.likesService.getUsersWhoLiked(postId);
  }

  @Get(':postId/count/likes')
  async CountLikesOfPost(@Param('postId') postId: string) {
    return this.likesService.CountLikesOfPost(postId)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  async unlike(@Param('postId') postId: string, @Req() req: Request) {
    const user = req.user as any;
    return this.likesService.unlike(user.userId, postId);
  }
}
