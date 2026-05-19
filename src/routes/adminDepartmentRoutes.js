import express from 'express';

import {
  createDepartment,
  getDepartments,
} from '../controllers/adminDepartmentController.js';

import validateDepartment from '../middlewares/departmentValidation.middleware.js';

const router = express.Router();

router.post(
  '/departments',
  validateDepartment,
  createDepartment
);

router.get(
  '/departments',
  getDepartments
);

export default router;