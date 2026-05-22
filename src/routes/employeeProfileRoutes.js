import express from 'express'
<<<<<<< HEAD
import {
  getEmployees,
  deactivateEmployee
} from '../controllers/employeeProfileController.js'
import authentication from '../middlewares/auth/authentication.js'
=======

import { deactivateEmployee } from '../controllers/employeeProfileController.js'
>>>>>>> main
import clockinValidation from '../middlewares/auth/clockinValidation.js'
import clockoutValidation from '../middlewares/auth/clockoutValidation.js'
import clockIn from '../controllers/clockinController.js'
import clockOut from '../controllers/clockoutController.js'

const router = express.Router()

<<<<<<< HEAD
router.get('/', getEmployees)

router.patch('/:id/deactivate', deactivateEmployee)

router.post('/clockout', clockoutValidation, clockOut)

router.post('/clockin', clockinValidation, clockIn)

=======
router.post('/clockout/:id', clockoutValidation, clockOut)

router.post('/clockin/:id', clockinValidation, clockIn)

router.patch('/:id/deactivate', deactivateEmployee)

>>>>>>> main
export default router
