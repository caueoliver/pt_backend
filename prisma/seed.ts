import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const senha = await bcrypt.hash('123456', 10);

  const user1 = await prisma.usuarios.create({
    data: {
      name: 'Gabriel',
      nome: 'gabriel',
      email: 'gabriel@email.com',
      password: senha,
    },
  });

  const user2 = await prisma.usuarios.create({
    data: {
      name: 'Maria',
      nome: 'maria',
      email: 'maria@email.com',
      password: senha,
    },
  });

  const loja = await prisma.lojas.create({
    data: {
      usuarioId: user1.id,
      nome: 'Loja do Gabriel',
      descricao: 'A melhor loja do mercado',
      logoUrl: 'https://placehold.co/64x64',
      bannerUrl: 'https://placehold.co/400x200',
      stickerUrl: 'https://placehold.co/64x64',
    },
  });

  const avaliacao = await prisma.avaliacoesLoja.create({
    data: {
      usuarioId: user2.id,
      lojaId: loja.id,
      nota: 5,
      comentario: 'Excelente loja, produtos de qualidade e entrega rápida!',
    },
  });

  await prisma.comentariosAvaliacoesLoja.create({
    data: {
      usuarioId: user1.id,
      avaliacoesLojaId: avaliacao.id,
      conteudo: 'Obrigado pela avaliação!',
    },
  });

  await prisma.comentariosAvaliacoesLoja.create({
    data: {
      usuarioId: user2.id,
      avaliacoesLojaId: avaliacao.id,
      conteudo: 'Com certeza voltarei a comprar.',
    },
  });

  console.log('Banco populado com sucesso.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
