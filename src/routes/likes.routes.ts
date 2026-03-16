import { Router } from "express";
import { createLike, getLikes } from "../controllers/likes.controller";

const router = Router();

router.get('/', getLikes);
router.post('/', createLike);
// router.delete('/:id', deleteLike);

export default router;