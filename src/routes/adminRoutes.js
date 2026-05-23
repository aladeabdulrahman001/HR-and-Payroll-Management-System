import express from 'express'
import authentication from '../middlewares/auth/authentication.js'
import authorization from '../middlewares/auth/authorization.js'
import setRole from '../middlewares/auth/setRole.js'
import inviteUser from '../controllers/auth/inviteUser.js'
import inviteUserValidation from '../middlewares/auth/inviteUserValidation.js'
import {
  createDepartment,
  getDepartments
} from '../controllers/departmentController.js'
import validateDepartmentCreation from '../middlewares/validators/departmentValidation.middleware.js'
import {
  deactivateEmployee,
  getEmployees
} from '../controllers/employeeProfileController.js'

const adminRouter = express.Router()

adminRouter.use(authentication)

adminRouter.post(
  '/onboard/admin',
  authorization('ADMIN'),
  setRole('ADMIN'),
  inviteUserValidation,
  inviteUser
)

adminRouter.post(
  '/onboard/hr',
  authorization('ADMIN'),
  setRole('HRM'),
  inviteUserValidation,
  inviteUser
)

adminRouter.post(
  '/onboard/department',
  authorization('ADMIN'),
  validateDepartmentCreation,
  createDepartment
)

adminRouter.get('/departments', authorization('ADMIN'), getDepartments)

adminRouter.get('/employees', authorization('ADMIN'), getEmployees)

adminRouter.patch(
  '/employee/:id/deactivate',
  authorization('ADMIN'),
  deactivateEmployee
)

export default adminRouter
