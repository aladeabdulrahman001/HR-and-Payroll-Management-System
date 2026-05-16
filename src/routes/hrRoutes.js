import express from 'express';
import hrController from '../controllers/hrController.js';

const router = express.Router();

router.post(
  '/invite-employee',
  hrController.inviteEmployee
);

export default router;