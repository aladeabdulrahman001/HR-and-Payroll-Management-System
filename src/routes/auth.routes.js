import Router from 'express'
import signInController from '../controllers/auth/signInController.js'
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

authRouter.post('/sign-in', signInValidation, signInController)

authRouter.post('/resend-invite', resendInviteLimiter, resendInvite)

authRouter.post('/setup-account', setupAccount)

export default authRouter
