import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { TaskService } from '../services/taskService';
import { Task } from '../models/task';

/**
 * Crear una nueva tarea
 */
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = Number(req.user!.id)
    const taskData: Task = req.body;
    taskData.userId = userId;
    const newTask = await TaskService.createTask(taskData);
    res.status(201).json(newTask);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Actualizar una tarea existente
 */
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.user!.id);
    const taskData: Partial<Task> = req.body;
    const updatedTask = await TaskService.updateTask(id, userId, taskData);
    res.status(200).json(updatedTask);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


/**
 * Eliminar una tarea
 */
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.user!.id);    
    await TaskService.deleteTask(id, userId);
    res.status(200).json({ message: 'Tarea eliminada' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Obtener todas las tareas de un usuario (opcional)
 */
export const getTasksById = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.user!.id);
    const tasks = await TaskService.getTasksById(id, userId);
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Obtener todas las tareas de un usuario (opcional)
 */
export const getTasksByUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = Number(req.user!.id);
    const tasks = await TaskService.getTasksByUser(userId);
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
