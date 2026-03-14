import { Router } from "express";
import { getComments, createComment, deleteComment } from "../controllers/comments.controller";

const router = Router();

router.get('/', getComments);
router.post('/', createComment);
router.delete('/:id', deleteComment);

export default router;