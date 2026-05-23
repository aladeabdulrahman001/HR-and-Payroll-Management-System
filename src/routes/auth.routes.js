import Router from 'express'
import signUpController from '../controllers/auth/signUpController.js'
import signInController from '../controllers/auth/signInController.js'
import signUpValidation from '../middlewares/auth/signUpValidation.js'
import signInValidation from '../middlewares/auth/signInValidation.js'
import resendInvite from '../controllers/auth/resendInvite.js'
import setupAccount from '../controllers/auth/setupAccount.js'
import rateLimit from 'express-rate-limit'

const authRouter = Router()

const resendInviteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    ok: false,
    error: { message: 'Too many requests, please try again later' }
  }
})

authRouter.post('/sign-up', signUpValidation, signUpController)

authRouter.post('/sign-in', signInValidation, signInController)

authRouter.post('/resend-invite', resendInviteLimiter, resendInvite)

authRouter.post('/setup-account', setupAccount)

authRouter.post('/sign-out', (req, res) => {
  // Handle user logout
  res.send('Logout endpoint')
})

export default authRouter
