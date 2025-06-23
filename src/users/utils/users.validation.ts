
import { NotFoundException } from "@nestjs/common";
import { UserDocument } from "../schema/user.schema";

export function validateUserFound(user: UserDocument | null): asserts user is UserDocument {
  if (!user) {
    throw new NotFoundException('User not found');
  }
}
