import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { PostDocument } from '../schema/post.schema';
import { Types } from 'mongoose';

export async function validatePostOwnership(post: PostDocument | null, userId: Types.ObjectId,): Promise<void> {
  if (!post) {
    throw new NotFoundException('Post not found');
  }

  if (!post.userId.equals(userId)) {
    throw new ForbiddenException('You can only change your own post');
  }
}
