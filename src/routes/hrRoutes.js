import express from 'express';

import hrController from '../controllers/hrController.js';

import validateEmployeeCreation from '../middlewares/employeeValidation.middleware.js';

const router = express.Router();

router.post(
  '/invite-employee',
  validateEmployeeCreation,
  hrController.inviteEmployee
);

export default router;