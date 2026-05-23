import express from 'express'
import inviteUser from '../controllers/auth/inviteUser.js'
import setRole from '../middlewares/auth/setRole.js'
import authentication from '../middlewares/auth/authentication.js'
import authorization from '../middlewares/auth/authorization.js'
import inviteUserValidation from '../middlewares/auth/inviteUserValidation.js'
import {
  getAttendance,
  getSingleAttendance
} from '../controllers/attendanceController.js'
import { getEmployees } from '../controllers/employeeProfileController.js'
import attendanceValidation from '../middlewares/validators/attendanceValidation.js'

const router = express.Router()

router.use(authentication)

router.post(
  '/onboard/employee',
  authorization('ADMIN', 'HRM'),
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

export default router
