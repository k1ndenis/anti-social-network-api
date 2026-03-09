import { Request, Response } from "express";
import fs from 'fs';
import path from "path";
import { Picture } from "../types/picture";

const filePath = path.join(__dirname, '..', '..', 'data', 'pictures.json');

export const getPictures = (req: Request, res: Response) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.json([]);
    res.json(JSON.parse(data || '[]'));
  })
}

export const createPicture = (req: Request, res: Response) => {
  const newPicture = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    let pictures: Picture[] = [];
    if (!err && data) {
      try {
        pictures = JSON.parse(data || '[]');
      } catch (e) {
        pictures = []
      };
    }

    pictures = pictures.filter(p => p.id !== newPicture.id);
    pictures.unshift(newPicture);

    fs.writeFile(filePath, JSON.stringify(pictures, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).json({ error: "Saving error" });
      }
      res.json(newPicture);
    })
  })
}

export const deletePicture = (req: Request, res: Response) => {
  const { id } = req.params;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: "Read error" });

    let pictures: Picture[] = [];
    try {
      pictures = JSON.parse(data);
    } catch (e) {
      pictures = []
    };

    const updatedPictures = pictures.filter((picture: Picture) => picture.id !== id);

    fs.writeFile(filePath, JSON.stringify(updatedPictures, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).json({ error: "Delete error" });
      res.status(200).json({ message: "Deleted successfully" });
    })
  })
}