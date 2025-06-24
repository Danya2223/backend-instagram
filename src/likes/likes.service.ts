import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like } from './schema/like.schema';
import { Model } from 'mongoose';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<Like>,
  ) { }

  async like(userId: string, postId: string): Promise<void> {
    await this.likeModel.create({ userId, postId });
  }

  async getUsersWhoLiked(postId: string) {
    const likes = await this.likeModel.find({ postId }).populate('userId', 'userName');
    return likes.map(like => like.userId);

  }

  async CountLikesOfPost(postId: string) {
    return this.likeModel.countDocuments({ postId });
  }
  async unlike(userId: string, postId: string): Promise<void> {
    await this.likeModel.deleteOne({ userId, postId })
  }
}
