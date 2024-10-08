import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import cron from 'node-cron';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000', // Development URL
    'https://mern-auth-1-vpwl.onrender.com', // Production URL
    'https://mern-auth-0eyb.onrender.com',
    'https://mern-auth-hgxd.vercel.app',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('Server is running'));
}

// Example cron job that runs every 10 minutes
cron.schedule('*/5 * * * * *', () => {
  // console.log('server is healthy');
  // Add your task here, such as updating records, clearing cache, etc.
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port,'0.0.0.0', () =>
  console.log(`Server running on port ${port}`)
);
