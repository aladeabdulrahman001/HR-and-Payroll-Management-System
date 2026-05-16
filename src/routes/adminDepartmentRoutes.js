import express from 'express';

import adminDepartmentController from '../controllers/adminDepartmentController.js';

import validateDepartmentCreation from '../middlewares/departmentValidation.middleware.js';

const router = express.Router();

router.post(
  '/departments',
  validateDepartmentCreation,
  adminDepartmentController.createDepartment
);

export default router;