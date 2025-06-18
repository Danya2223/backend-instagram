import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './shema/user.schema';
import mongoose, { Model, ObjectId, ObjectIdToString } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  findAll() {
    return `This action returns all users`;
  }

  async getUserById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException("user not found")
    }
    return user;
  }

  async followToUser(currentUserId: string, userGetFollowId: string) {
    if (currentUserId === userGetFollowId) {
      throw new Error("user can do follow for iself")
    }

    await this.getUserById(currentUserId)
    await this.getUserById(userGetFollowId);


    await this.userModel.updateOne(
      { _id: currentUserId },
      { $addToSet: { following: userGetFollowId } }
    );
    await this.userModel.updateOne(
      { _id: userGetFollowId },
      { $addToSet: { followers: currentUserId } }
    );

    return { message: "succsess" }
  }


  async unfollowToUser(currentUserId: string, userGetUnfollowId: string) {
    if (currentUserId === userGetUnfollowId) {
      throw new Error("user can do unfollow for yorurelf")
    }
    await this.getUserById(currentUserId)
    await this.getUserById(userGetUnfollowId);


    await this.userModel.updateOne(
      { _id: currentUserId },
      { $pull: { following: new mongoose.Types.ObjectId(userGetUnfollowId) } }
    );
    await this.userModel.updateOne(
      { _id: userGetUnfollowId },
      { $pull: { followers: new mongoose.Types.ObjectId(currentUserId) } }
    );

    return { message: "succsess" }

  }

  async getFollowers(userId: string): Promise<User[]> {
    const user = await this.userModel.findById(userId).populate('followers');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.followers as unknown as User[];
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

}
