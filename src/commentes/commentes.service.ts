import { Injectable } from '@nestjs/common';
import { CreateCommenteDto } from './dto/create-commente.dto';
import { UpdateCommenteDto } from './dto/update-commente.dto';

@Injectable()
export class CommentesService {
  create(createCommenteDto: CreateCommenteDto) {
    return 'This action adds a new commente';
  }

  findAll() {
    return `This action returns all commentes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commente`;
  }

  update(id: number, updateCommenteDto: UpdateCommenteDto) {
    return `This action updates a #${id} commente`;
  }

  remove(id: number) {
    return `This action removes a #${id} commente`;
  }
}
