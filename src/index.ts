import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import musicRoutes from './routes/music.routes';
import pictureRoutes from './routes/pictures.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send("Server is running")
})
app.use('/api/music', musicRoutes);
app.use('/api/pictures', pictureRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));