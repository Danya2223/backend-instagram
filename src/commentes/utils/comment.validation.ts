import { NotFoundException } from "@nestjs/common";
import { CommentDocument } from "../schema/comment.schema";

export function valitationComment(comment:CommentDocument | null, userId: string){
    if (!comment) {
    throw new NotFoundException("comment doesnt found!");
  }

  if (comment.userId.toString() !== userId) {
    throw new Error("you cannt delete this comment");
  }

}