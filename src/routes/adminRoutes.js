import express from 'express'
import authentication from '../middlewares/auth/authentication.js'
import authorization from '../middlewares/auth/authorization.js'
import setRole from '../middlewares/auth/setRole.js'
import inviteUser from '../controllers/auth/inviteUser.js'
import inviteUserValidation from '../middlewares/auth/inviteUserValidation.js'

// import { createDepartment } from '../controllers/departmentController.js'

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

adminRouter.get('/onboard/department', (req, res) => {
  res.status(200).send('Onboard department endpoint working')
})

export default adminRouter
