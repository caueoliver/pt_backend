import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log(' Iniciando o seed...');

  const senhaReal = '123456';
  const hashedPassword = await bcrypt.hash(senhaReal, 10);

  // 1. Criar usuário base
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

  await prisma.categorias.createMany({
    data: [
      { name: 'Mercado' },
      { name: 'Farmácia' },
      { name: 'Beleza' },
      { name: 'Moda' },
      { name: 'Eletrônicos' },
      { name: 'Jogos' },
      { name: 'Brinquedos' },
      { name: 'Casa' },
    ],
  });
  console.log(' Categorias criadas com sucesso!');

  // ==========================================
  // 3. CRIAR LOJAS
  // ==========================================

  const rareBeauty = await prisma.lojas.create({
    data: {
      usuarioId: usuario.id,
      nome: 'Rare Beauty',
      categoria: 'Beleza',
      descricao: 'Maquiagens para celebrar quem você é.',
      logoUrl: 'http://localhost:3001/uploads/img_lojas/rareBeautyLogo.png', 
      bannerUrl: 'https://via.placeholder.com/800x200', 
      stickerUrl: 'https://via.placeholder.com/50',
    },
  });
  console.log(` Loja criada: ${rareBeauty.nome}`);

  const cjr = await prisma.lojas.create({
    data: {
      usuarioId: usuario.id,
      nome: 'CJR',
      categoria: 'Eletrônicos', 
      descricao: 'Empresa Júnior de Computação.',
      logoUrl: 'http://localhost:3001/uploads/img_lojas/cjrLogo.png', 
      bannerUrl: 'https://via.placeholder.com/800x200', 
      stickerUrl: 'https://via.placeholder.com/50',
    },
  });
  console.log(` Loja criada: ${cjr.nome}`);

  const creamy = await prisma.lojas.create({
    data: {
      usuarioId: usuario.id,
      nome: 'Creamy',
      categoria: 'Beleza',
      descricao: 'Skincare inteligente e acessível.',
      logoUrl: 'http://localhost:3001/uploads/img_lojas/creamyLogo.png', 
      bannerUrl: 'https://via.placeholder.com/800x200', 
      stickerUrl: 'https://via.placeholder.com/50',
    },
  });
  console.log(` Loja criada: ${creamy.nome}`);

  const crocBrew = await prisma.lojas.create({
    data: {
      usuarioId: usuario.id,
      nome: 'Croc Brew',
      categoria: 'Mercado',
      descricao: 'O melhor café da região.',
      logoUrl: 'http://localhost:3001/uploads/img_lojas/crocBrewLogo.png', 
      bannerUrl: 'https://via.placeholder.com/800x200', 
      stickerUrl: 'https://via.placeholder.com/50',
    },
  });
  console.log(` Loja criada: ${crocBrew.nome}`);

  const miniReno = await prisma.lojas.create({
    data: {
      usuarioId: usuario.id,
      nome: 'Mini Reno',
      categoria: 'Casa',
      descricao: 'Decoração e utilidades para o seu lar.',
      logoUrl: 'http://localhost:3001/uploads/img_lojas/miniRenoLogo.png', 
      bannerUrl: 'https://via.placeholder.com/800x200', 
      stickerUrl: 'https://via.placeholder.com/50',
    },
  });
  console.log(` Loja criada: ${miniReno.nome}`);

  const amoca = await prisma.lojas.create({
    data: {
      usuarioId: usuario.id,
      nome: 'Amoca',
      categoria: 'Moda',
      descricao: 'Roupas com estilo e conforto.',
      logoUrl: 'http://localhost:3001/uploads/img_lojas/amocaLogo.png', 
      bannerUrl: 'https://via.placeholder.com/800x200', 
      stickerUrl: 'https://via.placeholder.com/50',
    },
  });
  console.log(` Loja criada: ${amoca.nome}`);

  // ==========================================
  // 4. CRIAR PRODUTOS E AVALIAÇÕES
  // ==========================================

  const categoriasMap = await prisma.categorias.findMany();
  const getCatId = (nome: string) => categoriasMap.find(c => c.name === nome)?.id;

  const produtosRareBeauty = [
    { name: 'Lapis Labial', preco: 139.90, desc: 'Lápis labial de alta precisão.' },
    { name: 'Iluminador', preco: 249.90, desc: 'Iluminador radiante.' },
    { name: 'Primer', preco: 139.00, desc: 'Primer preparador de pele.' },
    { name: 'Mascara de C.', preco: 109.99, desc: 'Máscara para cílios volumosos.' },
    { name: 'Mini Blush', preco: 99.99, desc: 'Blush compacto.' },
    { name: 'Pó Compacto', preco: 119.50, desc: 'Pó matificante.' },
    { name: 'Perfume Rare', preco: 599.90, desc: 'Fragrância exclusiva.' },
    { name: 'Bronzer', preco: 254.99, desc: 'Bronzer para contorno.' },
    { name: 'Bruma Facial', preco: 149.00, desc: 'Bruma hidratante.' },
    { name: 'Batom', preco: 179.00, desc: 'Batom de alta pigmentação.' },
    { name: 'Blush', preco: 199.99, desc: 'Blush líquido.' },
    { name: 'Gel Perfumado', preco: 179.99, desc: 'Gel iluminador corporal.' },
  ];

  for (const p of produtosRareBeauty) {
    await prisma.produtos.create({
      data: {
        lojaId: rareBeauty.id,
        categoriaId: getCatId('Beleza')!,
        name: p.name,
        description: p.desc,
        preco: p.preco,
        estoque: 100,
        imagens: { create: { imageUrl: 'https://via.placeholder.com/300', ordem: 1 } }
      }
    });
  }

  const produtosEletronicos = [
    { name: 'Iphone 15', preco: 4769.10, desc: 'Smartphone Apple.' },
    { name: 'Smart Tv Philips', preco: 1229.00, desc: 'TV 4K de alta definição.' },
    { name: 'Xbox Series X', preco: 3599.99, desc: 'Console de nova geração.' },
    { name: 'Macbook Air', preco: 15899.99, desc: 'Notebook ultrafino.' },
    { name: 'Iphone 16', preco: 4598.99, desc: 'O mais novo da Apple.' },
    { name: 'S25 Ultra', preco: 5769.10, desc: 'Samsung Galaxy de alta performance.' },
    { name: 'Ipad', preco: 7859.00, desc: 'Tablet versátil.' },
    { name: 'Headset Gamer', preco: 899.99, desc: 'Áudio imersivo.' },
  ];

  for (const p of produtosEletronicos) {
    await prisma.produtos.create({
      data: {
        lojaId: cjr.id,
        categoriaId: getCatId('Eletrônicos')!,
        name: p.name,
        description: p.desc,
        preco: p.preco,
        estoque: 20,
        imagens: { create: { imageUrl: 'https://via.placeholder.com/300', ordem: 1 } }
      }
    });
  }
  
  console.log(' Produtos criados com sucesso!');

  // criar uma avaliação para loja
  await prisma.avaliacoesLoja.create({
    data: {
      usuarioId: usuario.id,
      lojaId: rareBeauty.id,
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