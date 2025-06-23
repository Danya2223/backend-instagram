import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { validateUserFound } from './utils/users.validation'


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }


  async getUserById(id: string): Promise<UserDocument | null> {
    const user = await this.userModel.findById(id);
    validateUserFound(user)
    return user;
  }

  async followToUser(currentUserId: string, userGetFollowId: string) {
    if (currentUserId === userGetFollowId) {
      throw new Error("user cannt do follow for yourself")
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
      throw new Error("user cannt do unfollow for yorurelf")
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

  async getFollowers(userId: string): Promise<UserDocument[]> {
    const user = await this.userModel.findById(userId).populate('followers');
    validateUserFound(user)
    return user.followers as unknown as UserDocument[];
  }

  async getFollowing(userId: string): Promise<UserDocument[] | null> {
    const user = await this.userModel.findById(userId).populate('following');
    validateUserFound(user)
    return user.following as unknown as UserDocument[];
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    validateUserFound(user)
    return user;
  }

  async findByUserName(userName: string) {
    return this.userModel.findOne({ userName: userName }).select('+password');
  }
}


