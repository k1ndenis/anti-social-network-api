import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes';
import musicRoutes from './routes/music.routes';
import pictureRoutes from './routes/pictures.routes';
import commentRoutes from './routes/comments.routes'
import likesRoutes from './routes/likes.routes';
import { testConnection } from './config/db';

dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(express.static("public"));

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send("Server is running")
})
app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/pictures', pictureRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likesRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
  await testConnection();
})