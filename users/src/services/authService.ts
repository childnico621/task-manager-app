import { db } from '../repository/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto';

export const registerUser = async (user: User) => {
  const hashed = await bcrypt.hash(user.password, 10);
  const [result] = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [user.username, user.email, hashed]);
  return result;
};

export const loginUser = async (email: string, password: string) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  const user: any = (rows as any[])[0];
  if (!user) throw new Error('Usuario no encontrado');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Contraseña incorrecta');

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  return token;
};
