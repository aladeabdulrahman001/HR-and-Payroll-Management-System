import express from 'express'
import {
  getEmployees,
  deactivateEmployee
} from '../controllers/employeeProfileController.js'

const router = express.Router()

router.get('/', getEmployees)

router.patch('/:id/deactivate', deactivateEmployee)

export default router
