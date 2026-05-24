import express from 'express'
import {
  generatePayroll,
  getEmployeePayslips,
  getPayslipById,
  upsertSalaryStructure,
  getSalaryStructure
} from '../controllers/payroll.contoller.js'

import authentication from '../middlewares/auth/authentication.js'
import authorization from '../middlewares/auth/authorization.js'

const router = express.Router()

router.post(
  '/salary-structure',
  authentication,
  authorization('ADMIN'),
  upsertSalaryStructure
)

router.get(
  '/salary-structure/:employeeId',
  authentication,
  authorization('ADMIN', 'HRM'),
  getSalaryStructure
)

//Payroll Generation
router.post(
  '/generate',
  authentication,
  authorization('ADMIN'),
  generatePayroll
)

//Payslip Retrieval
router.get(
  '/employee/:employeeId',
  authentication,
  authorization('ADMIN', 'HRM'),
  getEmployeePayslips
)

router.get(
  '/:payslipId',
  authentication,
  authorization('ADMIN', 'HRM'),
  getPayslipById
)

export default router
