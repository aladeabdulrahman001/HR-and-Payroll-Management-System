import express from 'express';
import departmentController from '../controllers/departmentController.js';

const router = express.Router();

router.post('/', departmentController.createDepartment);

router.get('/', departmentController.getDepartments);

export default router;