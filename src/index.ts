import express from 'express';
import { json } from 'body-parser';
import { taskRouter } from './routes/task.routes.js';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use('/api/tasks', taskRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});