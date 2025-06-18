import { Injectable, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDocument, Posts } from './schema/post.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService {
  constructor(
      @InjectModel(Posts.name) private postModel: Model<PostDocument>
    ){}
  async create(createPostDto: CreatePostDto):Promise<Posts>{
    const user = new this.postModel(createPostDto);
    return user.save();
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
