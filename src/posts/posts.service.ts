import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDocument, Posts } from './schema/post.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { validatePostOwnership } from './utils/post.validation';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private postModel: Model<PostDocument>
  ) { }

  async createPost(createPostDto: CreatePostDto, userId: string): Promise<Posts> {
    const user = new this.postModel({ ...createPostDto, userId });
    return user.save();
  }

  async getPostsByUser(userId: Types.ObjectId): Promise<Posts[]> {
    const usersPost = await this.postModel.find({ userId: userId }).populate('userId');
    return usersPost;
  }

  async getOnePostByUser(postId: string, userId: Types.ObjectId): Promise<PostDocument | null> {
    return this.postModel.findOne({ _id: postId, userId });
  }

  async editPost(updatePostDto: UpdatePostDto, userId: Types.ObjectId): Promise<Posts | null> {
    const post = await this.getOnePostByUser(updatePostDto.postId, userId);
    await validatePostOwnership(post, userId);
    return this.postModel.findByIdAndUpdate({ _id: updatePostDto.postId, userId }, updatePostDto, { new: true },);
  }

  async deletePost(postId: string, userId: Types.ObjectId): Promise<Posts | null> {
    const post = await this.getOnePostByUser(postId, userId);
    await validatePostOwnership(post, userId);
    return this.postModel.findByIdAndDelete(post!._id);
  }
}
