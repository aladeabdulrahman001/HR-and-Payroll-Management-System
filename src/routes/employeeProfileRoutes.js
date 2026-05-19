import express from 'express';

import {
  deactivateEmployee,
} from '../controllers/employeeProfileController.js';
import clockinValidation from '../middlewares/auth/clockinValidation.js';
import clockoutValidation from '../middlewares/auth/clockoutValidation.js';
import clockIn from '../controllers/clockinController.js';
import clockOut from '../controllers/clockoutController.js';

const router = express.Router();

router.post(
  '/clockout/:id',
  clockoutValidation,
  clockOut
);

router.post(
  '/clockin/:id',
  clockinValidation,
  clockIn
);

router.patch(
  '/:id/deactivate',
  deactivateEmployee
);

export default router;