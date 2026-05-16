import express from 'express';
import employeeController from '../controllers/employeeProfileController.js';

const router = express.Router();

router.get('/', employeeController.getEmployees);

router.patch(
  '/:id/deactivate',
  employeeController.deactivateEmployee
);

export default router;