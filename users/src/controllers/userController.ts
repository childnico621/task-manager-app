import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    await authService.registerUser(req.body);
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await authService.loginUser(req.body.email, req.body.password);
    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
