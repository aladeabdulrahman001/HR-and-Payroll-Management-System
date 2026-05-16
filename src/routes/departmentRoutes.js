import express from 'express';
import departmentController from '../controllers/departmentController.js';

const router = express.Router();

router.get('/', departmentController.getDepartments);

export default router;