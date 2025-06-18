import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id/followers')
  async getFollowers(@Param('id') userId: string) {
    return this.usersService.getFollowers(userId);
  }


  @Post('follow/:currentId/:targetId')
  followUser(@Param('currentId') currentUserId: string, @Param('targetId') userGetFollowId: string) {
    return this.usersService.followToUser(currentUserId, userGetFollowId);
  }


  @Post('unfollow/:currentId/:targetId')
  unfollowUser(@Param('currentId') currentUserId: string, @Param('targetId') userGetUnfollowId: string) {
    return this.usersService.unfollowToUser(currentUserId, userGetUnfollowId);
  }
  @Get(':id')
  getUserProfile(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }


}
