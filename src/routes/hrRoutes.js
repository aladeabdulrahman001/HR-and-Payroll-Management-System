import express from 'express'
import inviteUser from '../controllers/auth/inviteUser.js'
import setRole from '../middlewares/auth/setRole.js'
import authentication from '../middlewares/auth/authentication.js'
import authorization from '../middlewares/auth/authorization.js'
import inviteUserValidation from '../middlewares/auth/inviteUserValidation.js'
import {
  getAttendance,
  getSingleAttendance
} from '../controllers/hr/attendanceController.js'
import { getEmployees } from '../controllers/hr/employeeProfileController.js'
import attendanceValidation from '../middlewares/validators/attendanceValidation.js'
import getEmployeeLeaves from '../controllers/hr/getEmployeeLeave.js'
import getLeaves from '../controllers/hr/getLeaves.js'
import reviewLeave from '../controllers/hr/reviewLeave.js'
import {
  leaveIdValidation,
  reviewLeaveValidation
} from '../middlewares/validators/leaveValidation.js'

const router = express.Router()

router.use(authentication)

router.use(authorization('ADMIN', 'HRM'))

router.post(
  '/onboard/employee',
  setRole('STAFF'),
  inviteUserValidation,
  inviteUser
)

router.get('/employees', getEmployees)

router.get('/employees/attendance', getAttendance)

router.get(
  '/employee/:id/attendance',
  attendanceValidation,
  getSingleAttendance
)

router.get('/leaves', getLeaves)

router.get('/employee/:id/leaves', getEmployeeLeaves)

router.patch(
  '/leaves/:id/review',
  leaveIdValidation,
  reviewLeaveValidation,
  reviewLeave
)

export default router
