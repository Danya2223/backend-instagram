import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { Types } from 'mongoose';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const user = req.user as any;
    return this.postsService.createPost(createPostDto, user.userId);
  }

  @Get('user/:userId')
  async getPostsByUser(@Param('userId') userId: Types.ObjectId) {
    return this.postsService.getPostsByUser(userId);
  }

  @Get(':PostId/:UserId')
  async getOnePostByUser(@Param('PostId') PostId: string, @Param('UserId') UserId: Types.ObjectId) {
    return this.postsService.getOnePostByUser(PostId, UserId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('edit/:postId')
  async updatePost(@Param('postId') postId: string, @Body() updatePostDto: UpdatePostDto, @Req() req: Request,
  ) {
    const user = req.user as any;
    return this.postsService.editPost( postId ,updatePostDto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':PostId')
  async deletePost(@Param('PostId') postId: string, @Req() req: Request) {
    const user = req.user as any;
    return this.postsService.deletePost(postId, user.userId);
  }
}
