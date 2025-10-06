import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado
 *       400:
 *         description: Error al registrar
 */
router.post('/register', userController.register);

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login de usuario
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', userController.login);

export default router;
