import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import { Welcome } from './components/home/Welcome';
import { PrivateRoute } from './components/PrivateRoute';
import { Menu } from './components/menu/Menu';
import { EditTask } from './pages/EditTask';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Welcome />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>}/>
          <Route path="/tasks/edit/:id" element={<PrivateRoute><EditTask /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
