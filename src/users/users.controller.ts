import { Controller, Get, Post, Body, Param, Req, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get(':id/followers')
  async getFollowers(@Param('id') userId: string) {
    return this.usersService.getFollowers(userId);
  }

  @Get(':id/following')
  async getFollowing(@Param('id') userId: string) {
    return this.usersService.getFollowing(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('follow/:targetId')
  async followUser(@Param('targetId') targetId: string, @Req() req: Request) {
    const user = req.user as any;
    return this.usersService.followToUser(user.userId, targetId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('unfollow/:targetId')
  async unFollowUser(@Param('targetId') targetId: string, @Req() req: Request) {
    const user = req.user as any;
    return this.usersService.unfollowToUser(user.userId, targetId);
  }

  @Get(':id')
  async getUserProfile(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() updateUserdto: UpdateUserDto, @Req() req: Request) {
    const user = req.user as any;
    return this.usersService.updateUser(user.userId, updateUserdto);
  }

}
