import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import postRoutes from './routes/posts.js';
import userRouter from './routes/user.js';
const app = express();

// DATABSE CONNECTION
dotenv.config();
connectDB();

// MIDDLEWARES
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// ROUTES
app.use('/posts', postRoutes);
app.use('/user', userRouter);

// SERVER CONNECTION
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
