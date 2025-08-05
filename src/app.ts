import express, { Application } from 'express';
import cors from 'cors';
import bookRoutes from './routes/book-routes';
import userRoutes from './routes/user-routes';
import { MongoBookRepository } from './database/MongoBookRepository';
import { MongoUserRepository } from './database/MongoUserRepository';

const app: Application = express();

app.use(express.json());
app.use(cors());

const bookRepository = new MongoBookRepository();
const userRepository = new MongoUserRepository();

app.set('bookRepository', bookRepository);
app.set('userRepository', userRepository);

app.use(bookRoutes);
app.use(userRoutes);

export default app;