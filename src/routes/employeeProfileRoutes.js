import express from 'express'
import authorization from '../middlewares/auth/authorization.js'
import authentication from '../middlewares/auth/authentication.js'
import clockinValidation from '../middlewares/validators/clockinValidation.js'
import clockoutValidation from '../middlewares/validators/clockoutValidation.js'
import clockIn from '../controllers/clockinController.js'
import clockOut from '../controllers/clockoutController.js'

const router = express.Router()

router.use(authentication)

router.use(authorization('ADMIN', 'HRM', 'STAFF'))

router.post('/clockout', clockoutValidation, clockOut)

router.post('/clockin', clockinValidation, clockIn)

export default router
