import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { API_TASKS_URL } from "../config/api";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export const EditTask = () => {
  const { id } = useParams<{ id: string }>();
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  // Cargar la tarea desde la API
  useEffect(() => {
    const fetchTask = async () => {
      if (!accessToken) return;
      const res = await fetch(`${API_TASKS_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      setTask(data);
      setTitle(data.title);
      setDescription(data.description);
      setCompleted(data.completed);
    };

    fetchTask();
  }, [id, accessToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;

    const res = await fetch(`${API_TASKS_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ title, description, completed }),
    });

    if (res.ok) {
      navigate("/tasks"); // regresar a la lista
    } else {
      alert("Error al actualizar la tarea");
    }
  };

  if (!task) return <p>Cargando...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Editar Tarea</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            Completada
          </label>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};
