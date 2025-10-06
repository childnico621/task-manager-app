import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import { setupSwagger } from './config/swagger';

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas del microservicio
app.use('/api/v1/users', userRoutes);

// Configurar documentación OpenAPI
setupSwagger(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Users API en puerto ${PORT}`));
