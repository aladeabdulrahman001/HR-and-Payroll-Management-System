import express from 'express'
import hrController from '../controllers/hrController.js'
import attendanceController from '../controllers/attendanceController.js'
import attendanceValidation from '../middlewares/auth/attendanceValidation.js'
const router = express.Router()

router.post('/invite-employee', hrController.inviteEmployee)
router.get('/get-empolyee', attendanceController.getAttendance)
router.get(
  '/employee/:id',
  attendanceValidation,
  attendanceController.getSingleAttendance
)

export default router
