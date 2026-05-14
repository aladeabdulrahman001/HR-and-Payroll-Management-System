import dotenv from 'dotenv';

dotenv.config({
  path: '.env.development.local',
});


import express from 'express';
import { PORT } from './utils/env.js';
import connectToDatabase from './utils/mongoose.js';
import authRouter from './routes/auth.routes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import employeeRoutes from './routes/employeeProfileRoutes.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

// Helps process form data sent via HTML forms
app.use(express.urlencoded({ extended: false }));

// Reads cookies from incoming requests
app.use(cookieParser());

app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);

app.use('/api/departments', departmentRoutes);

app.use('/api/employees', employeeRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the HR and Payroll Management System API');
});

// Error middleware
app.use(errorMiddleware);

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  await connectToDatabase();
});