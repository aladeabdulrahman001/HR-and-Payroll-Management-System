import dotenv from 'dotenv';

dotenv.config({
  path: '.env.development.local',
});

import express from 'express';
import { PORT } from './utils/env.js';
import connectToDatabase from './utils/mongoose.js';

import authRouter from './routes/auth.routes.js';
import employeeRoutes from './routes/employeeProfileRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import hrRoutes from './routes/hrRoutes.js';
import adminDepartmentRoutes from './routes/adminDepartmentRoutes.js';
import payrollRoutes from './routes/payroll.routes.js';


import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);

app.use('/api/employees', employeeRoutes);

app.use('/api/departments', departmentRoutes);

app.use('/api/hr', hrRoutes);

app.use('/api/admin', adminDepartmentRoutes);

// Home route
app.use('/api/payroll', payrollRoutes);

app.get('/', (req, res) => {
  res.send(
    'Welcome to the HR and Payroll Management System API'
  );
});

// Error middleware
app.use(errorMiddleware);

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  await connectToDatabase();
});