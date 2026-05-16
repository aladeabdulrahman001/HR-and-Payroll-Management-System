import express from 'express';

import adminDepartmentController from '../controllers/adminDepartmentController.js';

const router = express.Router();

router.post(
  '/departments',
  adminDepartmentController.createDepartment
);

export default router;