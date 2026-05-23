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
  '/salary-structure/:userId',
  authentication,
  authorization('ADMIN', 'STAFF'),
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
  '/employee/:userId',
  authentication,
  authorization('ADMIN', 'STAFF'),
  getEmployeePayslips
)

router.get(
  '/:payslipId',
  authentication,
  authorization('ADMIN', 'STAFF'),
  getPayslipById
)

export default router
