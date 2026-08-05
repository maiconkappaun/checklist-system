import { prisma } from "../config/database";

export async function createItem(descricao: string) {
  return prisma.item.create({
    data: {
      descricao,
    },
  });
}

export async function getItens() {
  try {
    return await prisma.item.findMany();
  } catch (error) {
    console.error("ERRO NO getItems:");
    console.error(error);

    throw error;
  }
}