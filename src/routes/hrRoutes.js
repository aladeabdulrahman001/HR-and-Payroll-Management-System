import express from 'express';

import hrController from '../controllers/hrController.js';


import { getEmployees, } from '../controllers/employeeProfileController.js';

const router = express.Router();

router.get(
  '/employees',
  getEmployees
);

export default router;