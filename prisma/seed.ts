import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log(' Iniciando o seed...');

  const senhaReal = '123456';
  const hashedPassword = await bcrypt.hash(senhaReal, 10);

  // criar usuário
  const usuario = await prisma.usuarios.create({
    data: {
      name: 'Selena Gomez',
      nome: 'selenagomez', 
      email: 'selena@rarebeauty.com',
      password: hashedPassword,
      profile_picture_url: 'https://i.pravatar.cc/150?img=5', 
    },
  });
  console.log(` Usuário criado: ${usuario.name}`);

  // criar categoria 
  const categoria = await prisma.categorias.create({
    data: {
      name: 'Beleza',
    },
  });
  console.log(` Categoria criada: ${categoria.name}`);

  // criar loja 
  const loja = await prisma.lojas.create({
    data: {
      usuarioId: usuario.id,
      nome: 'Rare Beauty',
      categoria: 'Beleza',
      descricao: 'Maquiagens para celebrar quem você é.',
      logoUrl: 'https://via.placeholder.com/150', 
      bannerUrl: 'https://via.placeholder.com/800x200', 
      stickerUrl: 'https://via.placeholder.com/50',
    },
  });
  console.log(` Loja criada: ${loja.nome}`);

  // criar produto 
  const produto = await prisma.produtos.create({
    data: {
      lojaId: loja.id,
      categoriaId: categoria.id,
      name: 'Blush Líquido Soft Pinch',
      description: 'Um blush líquido leve e de longa duração.',
      preco: 149.90,
      estoque: 50,
    },
  });
  console.log(` Produto criado: ${produto.name}`);

  // adicionar uma imagem ao produto 
  await prisma.imagensProdutos.create({
    data: {
      produtoId: produto.id,
      imageUrl: 'https://via.placeholder.com/300', 
      ordem: 1,
    },
  });

  // criar uma avaliação para loja
  await prisma.avaliacoesLoja.create({
    data: {
      usuarioId: usuario.id,
      lojaId: loja.id,
      nota: 5,
      comentario: 'Adorei os produtos! A embalagem é linda e a qualidade é impecável. Com certeza vou comprar novamente.',
    },
  });
  console.log(` Avaliação da loja criada!`);

  console.log(' Banco de dados populado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });