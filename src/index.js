import express from 'express';
import { PORT } from './config.js';
import userRoutes from './routes/users.routes.js';
import documentRoutes from './routes/documents.routes.js';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errors.middleware.js';
import cors from "cors";


const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(userRoutes);
app.use(documentRoutes);
app.use(errorHandler);

app.listen(PORT);
console.log("Server en el puerto", PORT)