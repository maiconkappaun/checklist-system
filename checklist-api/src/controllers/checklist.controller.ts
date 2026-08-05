import { Request, Response } from "express";

import * as checklistService from "../services/checklist.service";
import { ChecklistStatus } from "../generated/prisma/enums";

export async function createChecklist(req: Request, res: Response) {
  try {
    const {
      nome,
      descricao,
      status,
      itemIds,
    } = req.body;

    if (!nome || typeof nome !== "string") {
      return res.status(400).json({
        message: "O nome é obrigatório.",
      });
    }

    if (
      status !== ChecklistStatus.RASCUNHO &&
      status !== ChecklistStatus.PRONTO
    ) {
      return res.status(400).json({
        message: "Status inválido.",
      });
    }

    if (!Array.isArray(itemIds)) {
      return res.status(400).json({
        message: "itemIds deve ser um array.",
      });
    }

    if (itemIds.length === 0) {
      return res.status(400).json({
        message: "O checklist deve possuir pelo menos um item.",
      });
    }

    const checklist = await checklistService.createChecklist({
      nome: nome.trim(),
      descricao:
        typeof descricao === "string"
          ? descricao.trim()
          : undefined,
      status,
      itemIds,
    });

    return res.status(201).json(checklist);
  } catch (error) {
    console.error("ERRO AO CADASTRAR CHECKLIST:");
    console.error(error);

    return res.status(500).json({
      message: "Erro ao cadastrar checklist.",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function getChecklists(
  _req: Request,
  res: Response,
) {
  try {
    const checklists = await checklistService.getChecklists();

    return res.status(200).json(checklists);
  } catch (error) {
    console.error("ERRO AO BUSCAR CHECKLISTS:");
    console.error(error);

    return res.status(500).json({
      message: "Erro ao buscar checklists.",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function getAvailableChecklists(
  _req: Request,
  res: Response,
) {
  try {
    const checklists =
      await checklistService.getAvailableChecklists();

    return res.status(200).json(checklists);
  } catch (error) {
    console.error("ERRO AO BUSCAR CHECKLISTS DISPONÍVEIS:");
    console.error(error);

    return res.status(500).json({
      message: "Erro ao buscar checklists disponíveis.",
    });
  }
}

export async function getChecklistById(
  req: Request,
  res: Response,
) {
  try {
    const { id } = req.params;

    const checklist =
      await checklistService.getChecklistById(id);

    if (!checklist) {
      return res.status(404).json({
        message: "Checklist não encontrado.",
      });
    }

    return res.status(200).json(checklist);
  } catch (error) {
    console.error("ERRO AO BUSCAR CHECKLIST:");
    console.error(error);

    return res.status(500).json({
      message: "Erro ao buscar checklist.",
    });
  }
}


export async function alterarStatusChecklist(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const { id } = req.params;

    const { status } = req.body;

    if (
      status !== "RASCUNHO" &&
      status !== "PRONTO"
    ) {
      return res.status(400).json({
        message:
          "Status deve ser RASCUNHO ou PRONTO.",
      });
    }

    const checklist =
      await checklistService.alterarStatusChecklist(
        id,
        status,
      );

    return res.status(200).json(checklist);
  } catch (error) {
    console.error(
      "Erro ao alterar status do checklist:",
      error,
    );

    return res.status(500).json({
      message:
        "Erro ao alterar status do checklist.",
      error:
        error instanceof Error
          ? error.message
          : "Erro desconhecido.",
    });
  }
}

export async function getDraftChecklists(
  req: Request,
  res: Response,
) {
  try {
    const checklists =
      await checklistService.buscarChecklistsRascunho();

    return res.status(200).json(checklists);
  } catch (error) {
    console.error(
      "Erro ao buscar checklists rascunho:",
      error,
    );

    return res.status(500).json({
      message:
        "Erro ao buscar checklists rascunho.",
    });
  }
}