import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/MongoDb.js';
import authRoutes from './routes/authRoute.js';
import postRoutes from './routes/postRoutes.js';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure env
dotenv.config();

// Database config
connectDB();

// Create Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));



// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/post', postRoutes);

// Catch-all route
if (process.env.MODE !== 'Development') {
  // Serve static files from the client build directory
  app.use(express.static(path.join(__dirname, './client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
  });
}
else {
  app.get('/', (req, res) => {
    res.send("hello to the Developer Team");
  })
}


// PORT
const PORT = process.env.PORT ;

// Run server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.MODE} mode on port ${PORT}`);
});
