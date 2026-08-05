import { prisma } from "../config/database";
import { ChecklistStatus } from "../generated/prisma/enums";

interface CreateChecklistData {
  nome: string;
  descricao?: string;
  status: ChecklistStatus;
  itemIds: string[];
}

export async function createChecklist(data: CreateChecklistData) {
  return prisma.$transaction(async (tx) => {
    const items = await tx.item.findMany({
      where: {
        id: {
          in: data.itemIds,
        },
      },
      select: {
        id: true,
      },
    });

    if (items.length !== data.itemIds.length) {
      throw new Error("Um ou mais itens informados não existem.");
    }

    const checklist = await tx.checklist.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        status: data.status,
      },
    });

    await tx.checklistItem.createMany({
      data: data.itemIds.map((itemId) => ({
        checklistId: checklist.id,
        itemId,
      })),
    });

    return tx.checklist.findUnique({
      where: {
        id: checklist.id,
      },
      include: {
        checklistItems: {
          include: {
            item: true,
          },
        },
      },
    });
  });
}

export async function getChecklists() {
  return prisma.checklist.findMany({
    include: {
      checklistItems: {
        include: {
          item: true,
        },
      },
    },
    orderBy: {
      nome: "asc",
    },
  });
}

export async function getAvailableChecklists() {
  return prisma.checklist.findMany({
    where: {
      status: ChecklistStatus.PRONTO,
    },
    include: {
      checklistItems: {
        include: {
          item: true,
        },
      },
    },
    orderBy: {
      nome: "asc",
    },
  });
}

export async function getChecklistById(id: string) {
  return prisma.checklist.findUnique({
    where: {
      id,
    },
    include: {
      checklistItems: {
        include: {
          item: true,
        },
      },
    },
  });
}

export async function alterarStatusChecklist(
  id: string,
  status: ChecklistStatus,
) {
  return prisma.checklist.update({
    where: {
      id,
    },
    data: {
      status,
    },
    include: {
      checklistItems: {
        include: {
          item: true,
        },
      },
    },
  });
}

export async function buscarChecklistsRascunho() {
  return prisma.checklist.findMany({
    where: {
      status: "RASCUNHO",
    },
    include: {
      checklistItems: {
        include: {
          item: true,
        },
      },
    },
    orderBy: {
      nome: "asc",
    },
  });
}