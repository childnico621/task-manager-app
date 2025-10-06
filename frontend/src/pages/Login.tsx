import { useState, useContext } from 'react';
import {userInstance} from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await userInstance.post('/users/login', { email, password });
    login(res.data.token);
    navigate("/tasks");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
      <button type="submit">Login</button>
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Link to="/register">¿No tienes cuenta? Regístrate aquí</Link>
      </div>
    </form>
  );
}
