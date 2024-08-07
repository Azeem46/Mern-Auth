import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const corsOptions = {
  origin: 'https://mern-auth-1-5zyo.onrender.com', // Your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));


app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes); // Use task routes

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/disc')));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist','index.html')))
} else {
    app.get('/', (req, res) => res.send('Server is running'))
}



app.use(notFound);
app.use(errorHandler);

app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));