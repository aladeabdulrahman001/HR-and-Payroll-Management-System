import express from 'express'
<<<<<<< HEAD
import inviteUser from '../controllers/auth/inviteUser.js'
import setRole from '../middlewares/auth/setRole.js'
import authentication from '../middlewares/auth/authentication.js'
import authorization from '../middlewares/auth/authorization.js'
import inviteUserValidation from '../middlewares/auth/inviteUserValidation.js'

const router = express.Router()

router.use(authentication)

router.post(
  '/onboard/employee',
  authorization('ADMIN', 'HRM'),
  setRole('STAFF'),
  inviteUserValidation,
  inviteUser
)

=======
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
>>>>>>> main
export default router
