import { Test, TestingModule } from '@nestjs/testing';
import { CommentesController } from './commentes.controller';
import { CommentesService } from './commentes.service';

describe('CommentesController', () => {
  let controller: CommentesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentesController],
      providers: [CommentesService],
    }).compile();

    controller = module.get<CommentesController>(CommentesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
