import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommenteDto } from './dto/create-commente.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDocument, Comments } from './schema/comment.schema';
import { Model } from 'mongoose';
import { valitationComment } from './utils/comment.validation';

@Injectable()
export class CommentesService {
  constructor(
    @InjectModel(Comments.name) private commentModel: Model<CommentDocument>
  ) { }
  async createComment(createCommenteDto: CreateCommenteDto, postId: string, userId: string) {
    const user = new this.commentModel({ ...createCommenteDto, userId, postId });
    return user.save();

  }

  async getAllCommentsOfPost(postId: string) {
    return await this.commentModel.find({ postId }).populate('userId', 'userName');
  }

  async deleteComment(commentId: string, userId: string): Promise<void> {
  const comment = await this.commentModel.findById(commentId);
   valitationComment(comment, userId)
  await this.commentModel.deleteOne({ _id: commentId });
}

}
