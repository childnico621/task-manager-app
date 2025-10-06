import { Router } from 'express';
import * as taskController from '../controllers/taskController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

/**
 * @openapi
 * /:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarea creada
 */
router.post('/', authenticate, taskController.createTask);

/**
 * @openapi
 * /:id:
 *   put:
 *     summary: Actualizar una tarea existente
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarea actualizada
 */
router.put('/:id', authenticate, taskController.updateTask);

/**
 * @openapi
 * /:id:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Tarea eliminada
 */
router.delete('/:id', authenticate, taskController.deleteTask);

/**
 * @openapi
 * /:id:
 *   get:
 *     summary: Obtener todas las tareas de un usuario
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Lista de tareas del usuario
 */
router.get('/:id', authenticate, taskController.getTasksById);

/**
 * @openapi
 * /user/:userId:
 *   get:
 *     summary: Obtener todas las tareas de un usuario
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Lista de tareas del usuario
 */
router.get('/user/:userId', authenticate, taskController.getTasksByUser);

export default router;
