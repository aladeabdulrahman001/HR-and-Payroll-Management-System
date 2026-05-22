import express from 'express'
import authentication from '../middlewares/auth/authentication.js'
import employeeController from '../controllers/employeeProfileController.js'
import clockinValidation from '../middlewares/auth/clockinValidation.js'
import clockoutValidation from '../middlewares/auth/clockoutValidation.js'
import clockIn from '../controllers/clockinController.js'
import clockOut from '../controllers/clockoutController.js'

const router = express.Router()
router.use(authentication)

router.get('/', employeeController.getEmployees)
router.post('/clockout', clockoutValidation, clockOut)
router.post('/clockin', clockinValidation, clockIn)

router.patch('/:id/deactivate', employeeController.deactivateEmployee)

export default router
