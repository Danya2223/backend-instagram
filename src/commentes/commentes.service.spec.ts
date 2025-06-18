import { Test, TestingModule } from '@nestjs/testing';
import { CommentesService } from './commentes.service';

describe('CommentesService', () => {
  let service: CommentesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentesService],
    }).compile();

    service = module.get<CommentesService>(CommentesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
