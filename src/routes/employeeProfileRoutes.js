import express from 'express'
import authorization from '../middlewares/auth/authorization.js'
import authentication from '../middlewares/auth/authentication.js'
import clockinValidation from '../middlewares/validators/clockinValidation.js'
import clockoutValidation from '../middlewares/validators/clockoutValidation.js'
import clockIn from '../controllers/employee/clockinController.js'
import clockOut from '../controllers/employee/clockoutController.js'
import requestLeave from '../controllers/employee/requestLeave.js'
import cancelLeave from '../controllers/employee/cancelLeave.js'
import getMyLeaves from '../controllers/employee/getMyLeaves.js'
import {
  requestLeaveValidation,
  leaveIdValidation
} from '../middlewares/validators/leaveValidation.js'

const router = express.Router()

router.use(authentication)

router.use(authorization('ADMIN', 'HRM', 'STAFF'))

router.post('/clockout', clockoutValidation, clockOut)

router.post('/clockin', clockinValidation, clockIn)

router.post('/leaves/request', requestLeaveValidation, requestLeave)

router.delete('/leaves/:id/cancel', leaveIdValidation, cancelLeave)

router.get('/leaves/me', getMyLeaves)

export default router
