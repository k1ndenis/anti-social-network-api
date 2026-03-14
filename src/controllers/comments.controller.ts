import { Request, Response } from "express";
import fs from 'fs'
import path from 'path'
import { Comment } from "../types/comment";

const filePath = path.join(__dirname, '..', '..', 'data', 'comments.json');

export const getComments = (req: Request, res: Response) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: "Read error" });
    let comments: Comment[] = [];
    try {
      comments = JSON.parse(data || '[]');
    } catch {
      comments = [];
    }

    const grouped: { [pictureId: string]: Comment[] } = {};
    comments.forEach(c => {
      if (!grouped[c.pictureId]) grouped[c.pictureId] = [];
      grouped[c.pictureId].push(c);
    });
    res.json(grouped);
  })
};

export const createComment = (req: Request, res: Response) => {
  const newComment = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    let comments: Comment[] = [];
    if (!err && data) {
      try {
        comments = JSON.parse(data || '[]');
      } catch (e) {
        comments = [];
      };
    }

    comments = comments.filter(c => c.id !== newComment.id);
    comments.unshift(newComment);

    fs.writeFile(filePath, JSON.stringify(comments, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).json({ error: "Saving error" });
      }
      res.json(newComment);
    })
  })
};

export const deleteComment = (req: Request, res: Response) => {
  const { id } = req.params;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: "Read error" });

    let comments: Comment[] = [];
    try {
      comments = JSON.parse(data || '[]');
    } catch (e) {
      comments = [];
    }

    const updatedComments = comments.filter((comment: Comment) => comment.id !== id);

    fs.writeFile(filePath, JSON.stringify(updatedComments, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).json({ error: "Delete error" });
      res.status(200).json({ message: "Deleted successfully" });
    })
  })
}
