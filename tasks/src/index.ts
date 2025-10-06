import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import { setupSwagger } from './config/swagger';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Versionado de API
app.use('/api/v1/tasks', taskRoutes);

// Configuración Swagger
setupSwagger(app);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Tasks API v1 en puerto ${PORT}`));