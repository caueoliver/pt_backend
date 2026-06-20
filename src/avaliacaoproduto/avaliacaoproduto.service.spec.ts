import { Test, TestingModule } from '@nestjs/testing';
import { AvaliacaoprodutoService } from './avaliacaoproduto.service';

describe('AvaliacaoprodutoService', () => {
  let service: AvaliacaoprodutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvaliacaoprodutoService],
    }).compile();

    service = module.get<AvaliacaoprodutoService>(AvaliacaoprodutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
