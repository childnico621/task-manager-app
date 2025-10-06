import { Task } from '../models/task';
import { db } from '../repository/db';

export class TaskService {
  /**
   * Crear una nueva tarea
   */
  static async createTask(task: Task): Promise<Task> {
    const query = `
      INSERT INTO tasks (userId, title, description, completed)
      VALUES (?, ?, ?, ?)
    `;
    const params = [task.userId, task.title, task.description, task.completed || false];

    const [result]: any = await db.execute(query, params);
    return { id: result.insertId, ...task, completed: task.completed || false };
  }

  /**
   * Actualizar una tarea existente
   */
  static async updateTask(id: number, userId:number, task: Partial<Task>): Promise<Task> {
    const query = `
      UPDATE tasks
      SET title = ?, description = ?, completed = ?
      WHERE id = ? AND userId = ?
    `;
    const params = [task.title, task.description, task.completed || false, id, userId];

    await db.execute(query, params);
    return { id, ...task, completed: task.completed || false } as Task;
  }

  /**
   * Eliminar una tarea
   */
  static async deleteTask(id: number, userId:number): Promise<void> {
    const query = `DELETE FROM tasks WHERE id = ? AND userId = ?`;
    await db.execute(query, [id, userId]);
  }

  /**
   * Obtener una tareas de un usuario por su id de tarea e id de usuario
   */
  static async getTasksById(id:number, userId: number): Promise<Task> {
    const query = `SELECT * FROM tasks WHERE id = ? AND userId = ?`;
    const [rows]: any = await db.execute(query, [id, userId]);
    return rows[0] as Task;
  }

  /**
   * Obtener todas las tareas de un usuario
   */
  static async getTasksByUser(userId: number): Promise<Task[]> {
    const query = `SELECT * FROM tasks WHERE userId = ?`;
    const [rows]: any = await db.execute(query, [userId]);
    return rows as Task[];
  }
}
