import { Request, Response } from "express";
import authService from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ error: "All fields are required" });
    };

    const result = await authService.register(email, password, username);
    res.status(201).json(result);
  } catch (error: any) {
    if (error.message === "Email already exists") {
      return res.status(400).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const {email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    };

    const result = await authService.login(email, password);
    res.json(result);
  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({ error: error.message });
    };
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
};