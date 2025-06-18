import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentesService } from './commentes.service';
import { CreateCommenteDto } from './dto/create-commente.dto';
import { UpdateCommenteDto } from './dto/update-commente.dto';

@Controller('commentes')
export class CommentesController {
  constructor(private readonly commentesService: CommentesService) {}

  @Post()
  create(@Body() createCommenteDto: CreateCommenteDto) {
    return this.commentesService.create(createCommenteDto);
  }

  @Get()
  findAll() {
    return this.commentesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommenteDto: UpdateCommenteDto) {
    return this.commentesService.update(+id, updateCommenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentesService.remove(+id);
  }
}
