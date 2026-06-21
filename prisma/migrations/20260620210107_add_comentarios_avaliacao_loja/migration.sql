-- CreateTable
CREATE TABLE "comentariosAvaliacoesLoja" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "avaliacoesLojaId" INTEGER NOT NULL,
    "conteudo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "comentariosAvaliacoesLoja_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comentariosAvaliacoesLoja_avaliacoesLojaId_fkey" FOREIGN KEY ("avaliacoesLojaId") REFERENCES "avaliacoesLoja" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
