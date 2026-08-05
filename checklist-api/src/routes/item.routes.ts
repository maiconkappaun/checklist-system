import { Router } from "express";

import {
  createItem,
  getItens,
} from "../controllers/item.controller";

const router = Router();

router.post("/", createItem);
router.get("/", getItens);

export default router;