import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import { sequelize } from './config/database.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

sequelize.sync().then(() => {
    console.log('Database synchronized');
});

export default app;
