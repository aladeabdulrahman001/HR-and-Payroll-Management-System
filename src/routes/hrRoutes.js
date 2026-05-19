import express from 'express';

import hrController from '../controllers/hrController.js';

import validateInviteEmployee from '../middlewares/inviteEmployeeValidation.middleware.js';

import { getEmployees, } from '../controllers/employeeProfileController.js';

const router = express.Router();

router.post(
  '/invite-employee',
  validateInviteEmployee,
  hrController.inviteEmployee
);
router.get(
  '/employees',
  getEmployees
);

export default router;