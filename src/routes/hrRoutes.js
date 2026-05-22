import express from 'express'
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

export default router
