import { Test, TestingModule } from '@nestjs/testing';
import { AvaliacoesLojaController } from './avaliacaoloja.controller';
import { AvaliacaolojaService } from './avaliacaoloja.service';

describe('AvaliacoesLojaController', () => {
  let controller: AvaliacoesLojaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvaliacoesLojaController],
      providers: [AvaliacaolojaService],
    }).compile();

    controller = module.get<AvaliacoesLojaController>(AvaliacoesLojaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
