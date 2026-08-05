import { Request, Response } from "express";

import * as itemService from "../services/item.service";

export async function createItem(req: Request, res: Response) {
    try {
        const { descricao } = req.body;

        if (!descricao || typeof descricao !== "string") {
            return res.status(400).json({
                message: "A descrição é obrigatória.",
            });
        }

        const item = await itemService.createItem(descricao.trim());

        return res.status(201).json(item);
    } catch (error) {
        console.error("=================================");
        console.error("ERRO AO CADASTRAR ITEM");
        console.error(error);
        console.error("=================================");

        return res.status(500).json({
            message: "Erro ao cadastrar item.",
            error: error instanceof Error ? error.message : error,
        });
    }
}

export async function getItens(_req: Request, res: Response) {
    try {
        const itens = await itemService.getItens();

        return res.status(200).json(itens);
    } catch (error) {
        console.error("ERRO AO BUSCAR ITENS:");
        console.error(error);

        return res.status(500).json({
            message: "Erro ao buscar itens.",
        });
    }
}