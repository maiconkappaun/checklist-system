import { Router } from "express";

import {
  createChecklist,
  getChecklists,
  getAvailableChecklists,
  getChecklistById,
  alterarStatusChecklist,
  getDraftChecklists,
} from "../controllers/checklist.controller";

const router = Router();

router.post("/", createChecklist);

router.get("/", getChecklists);

router.get(
  "/disponiveis",
  getAvailableChecklists,
);

router.get(
  "/rascunhos",
  getDraftChecklists,
);

router.get("/:id", getChecklistById);

router.patch(
  "/:id/status",
  alterarStatusChecklist,
);

export default router;