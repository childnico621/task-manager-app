// frontend/src/components/Menu.tsx
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
  const { accessToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // limpia token y storage
    navigate("/login"); // redirige al login
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <span style={{ marginRight: "20px" }}>Task Manager</span>
      {accessToken && (
        <button onClick={handleLogout} style={{ cursor: "pointer" }}>
          Logout
        </button>
      )}
    </nav>
  );
};
