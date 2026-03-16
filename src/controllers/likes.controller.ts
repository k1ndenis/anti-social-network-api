import { Request, Response } from "express";
import fs from 'fs';
import path from "path";
import { Like } from "../types/like";

const filePath = path.join(__dirname, '..', '..', 'data', 'likes.json');

export const getLikes = (req: Request, res: Response) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: "Read error" });
    let likes: Like[] = [];
    try {
      likes = JSON.parse(data || '[]');
    } catch {
      likes = [];
    }

    const grouped: { [pictureId: string]: Like[] } = {};
    likes.forEach(l => {
      if (!grouped[l.pictureId]) grouped[l.pictureId] = [];
      grouped[l.pictureId].push(l);
    })
    return res.json(grouped);
  })
};

export const createLike = (req: Request, res: Response) => {
  const newLike = req.body;
  fs.readFile(filePath, 'utf8', (err, data) => {
    let likes = [];
    if (!err && data) {
      try {
        likes = JSON.parse(data || '[]');
      } catch {
        likes = [];
      }
    }

    if (likes.find((like: Like) => like.userId === newLike.userId)) {
      likes = likes.filter((like: Like) => like.userId !== newLike.userId);
    } else {
      likes.unshift(newLike);
    };

    fs.writeFile(filePath, JSON.stringify(likes, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).json({ error: "Saving error" });
      }
      res.json(newLike);
    })
  })
}