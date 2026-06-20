import { Test, TestingModule } from '@nestjs/testing';
import { AvaliacaoprodutoController } from './avaliacaoproduto.controller';
import { AvaliacaoprodutoService } from './avaliacaoproduto.service';

describe('AvaliacaoprodutoController', () => {
  let controller: AvaliacaoprodutoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvaliacaoprodutoController],
      providers: [AvaliacaoprodutoService],
    }).compile();

    controller = module.get<AvaliacaoprodutoController>(AvaliacaoprodutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
