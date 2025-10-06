import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userInstance } from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const { login } = useContext(AuthContext); // acceder a la función login del contexto
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // Llamada a tu microservicio users
      const res = await userInstance.post('/users/register', { username, email, password });

      // Suponiendo que tu API devuelve accessToken al registrar
      const { accessToken } = res.data;

      if (accessToken) {
        login(accessToken); // guardar token en contexto
        navigate('/tasks'); // redirigir a la página de tareas
      } else {
        setError('No se recibió token del servidor');
        navigate('/login');
      }
    } catch (err: any) {
      // Manejo de errores
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Error al registrar usuario');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Registro de Usuario</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>
          Registrar
        </button>
      </form>
    </div>
  );
}
