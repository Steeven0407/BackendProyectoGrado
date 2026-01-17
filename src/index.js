import express from 'express';
import { PORT } from './config.js';
import userRoutes from './routes/users.routes.js';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errors.middleware.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(userRoutes);
app.use(errorHandler);

app.listen(PORT);
console.log("Server en el puerto", PORT)