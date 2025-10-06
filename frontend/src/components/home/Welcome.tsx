import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const goToTasks = () => {
    navigate("/tasks");
  };
   const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!accessToken ? (
        <>
          <h1>Bienvenido a Task Manager</h1>
          <p>Por favor, inicia sesión para continuar</p>
          <button onClick={goToLogin}>Iniciar Sesión</button>
        </>
      ) : (
        <>
          <h1>¡Hola de nuevo!</h1>
          <button onClick={goToTasks}>Ir a mis tareas</button>
        </>
      )}
    </div>
  );
};
