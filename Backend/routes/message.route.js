import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const router = express.Router();

router.get("/:id", ensureAuthenticated, getMessages);
router.post("/send/:id", ensureAuthenticated, sendMessage);

export default router;