import express from 'express'
import {
  getEmployees,
  deactivateEmployee
} from '../controllers/employeeProfileController.js'
import authentication from '../middlewares/auth/authentication.js'
import clockinValidation from '../middlewares/auth/clockinValidation.js'
import clockoutValidation from '../middlewares/auth/clockoutValidation.js'
import clockIn from '../controllers/clockinController.js'
import clockOut from '../controllers/clockoutController.js'

const router = express.Router()
router.use(authentication)

router.get('/', getEmployees)

router.patch('/:id/deactivate', deactivateEmployee)

router.post('/clockout', clockoutValidation, clockOut)

router.post('/clockin', clockinValidation, clockIn)

export default router
