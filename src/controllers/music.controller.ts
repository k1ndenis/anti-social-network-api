import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Track } from './../types/track'

const filePath = path.join(__dirname, '..', '..', 'data', 'tracks.json');

export const getTracks = (req: Request, res: Response) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: "Read error" });
    res.json(JSON.parse(data || '[]'));
  })
};

export const createTrack = (req: Request, res: Response) => {
  const newTrack = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    let tracks: Track[] = [];
    if (!err && data) {
      try {
        tracks = JSON.parse(data);
      } catch (e) {
        tracks = []
      };
    }

    tracks = tracks.filter(p => p.id !== newTrack.id);
    tracks.unshift(newTrack);

    fs.writeFile(filePath, JSON.stringify(tracks, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).json({ error: "Saving error" });
      }
      res.json(newTrack);
    });
  });
};

export const deleteTrack = (req: Request, res: Response) => {
  const { id } = req.params;
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: "Read error" });

    let tracks: Track[] = [];
    try {
      tracks = JSON.parse(data || '[]');
    } catch (e) {
      tracks = [];
    }

    const updatedTracks = tracks.filter((track: Track) => track.id !== id);

    fs.writeFile(filePath, JSON.stringify(updatedTracks, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).json({ error: "Delete error" });
      res.status(200).json({ message: "Deleted successfully" });
    })
  })
}