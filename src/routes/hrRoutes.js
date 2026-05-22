import express from 'express'
import attendanceController from '../controllers/attendanceController.js'
import hrController from '../controllers/hrController.js'
import { getEmployees } from '../controllers/employeeProfileController.js'
import attendanceValidation from '../middlewares/auth/attendanceValidation.js'
const router = express.Router()

router.post('/invite-employee', hrController.inviteEmployee)
router.get('/get-empolyee', attendanceController.getAttendance)
router.get(
  '/employee/:id',
  attendanceValidation,
  attendanceController.getSingleAttendance
)

router.get('/employees', getEmployees)
export default router
