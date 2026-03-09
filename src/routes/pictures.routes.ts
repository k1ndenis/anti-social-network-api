import { Router } from "express";
import { createPicture, deletePicture, getPictures } from "../controllers/pictures.controller";

const router = Router();

router.get('/', getPictures);
router.post('/', createPicture);
router.delete('/:id', deletePicture);

export default router;