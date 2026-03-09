import { Router } from 'express';
import { createTrack, deleteTrack, getTracks } from '../controllers/music.controller';

const router = Router();

router.get('/', getTracks);
router.post('/', createTrack);
router.delete('/:id', deleteTrack);

export default router;