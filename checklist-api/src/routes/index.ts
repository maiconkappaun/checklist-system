import { Router } from "express";

import itemRoutes from "./item.routes";
import checklistRoutes from "./checklist.routes";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "API funcionando",
  });
});

router.use("/itens", itemRoutes);
router.use("/checklists", checklistRoutes);

export default router;