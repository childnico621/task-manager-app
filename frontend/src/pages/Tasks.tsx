import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { taskInstance } from '../services/axiosInstance';
import { API_TASKS_URL } from "../config/api";

export default function Tasks() {
  const { accessToken } = useContext(AuthContext);
  const [tasks, setTasks] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    taskInstance.get('/tasks/user/1').then(res => setTasks(res.data));
  }, []);

  const handleDelete = async (id: number) => {
    if (!accessToken) return;

    const confirmed = window.confirm("¿Seguro que quieres eliminar esta tarea?");
    if (!confirmed) return;

    const res = await fetch(`${API_TASKS_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.ok) {
      // Actualizar la lista de tareas localmente
      setTasks(tasks.filter((task) => task.id !== id));
    } else {
      alert("Error al eliminar la tarea");
    }
  };

  return (
    <div>
      <h1>Mis Tareas</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Título</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Descripción</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{task.title}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{task.description}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                <button onClick={() => navigate(`/tasks/edit/${task.id}`)}>Actualizar</button>
                <button onClick={() => handleDelete(task.id)} style={{ marginLeft: '8px' }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
