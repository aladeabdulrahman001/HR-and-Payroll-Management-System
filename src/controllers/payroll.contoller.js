import * as payrollService from '../services/payroll.service.js';

const generatePayroll = async (req, res, next) => {
  try {
    const { userId, month, year } = req.body;
    const generatedBy = req.user.userId; // injected by your auth middleware

    if (!userId || !month || !year) {
      return res.status(400).json({
        success: false,
        message: 'userId, month, and year are required',
      });
    }

    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);

    if (parsedMonth < 1 || parsedMonth > 12) {
      return res.status(400).json({
        success: false,
        message: 'month must be between 1 and 12',
      });
    }

    const { created, payslip } = await payrollService.generatePayroll(
      userId,
      parsedMonth,
      parsedYear,
      generatedBy
    );

    if (!created) {
      return res.status(200).json({
        success: true,
        message: 'Payroll already exists for this employee and period',
        data: payslip,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Payroll generated successfully',
      data: payslip,
    });
  } catch (error) {
    next(error);
  }
};

//ADMIN or STAFF — fetch all payslips for an employee
const getEmployeePayslips = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const payslips = await payrollService.getEmployeePayslips(userId);

    return res.status(200).json({
      success: true,
      count: payslips.length,
      data: payslips,
    });
  } catch (error) {
    next(error);
  }
};

const getPayslipById = async (req, res, next) => {
  try {
    const { payslipId } = req.params;
    const payslip = await payrollService.getPayslipById(payslipId);

    return res.status(200).json({
      success: true,
      data: payslip,
    });
  } catch (error) {
    next(error);
  }
};

//ADMIN only create or update a salary structure for an employee
const upsertSalaryStructure = async (req, res, next) => {
  try {
    const { userId, baseSalary, taxRate, standardAllowances, standardDeductions } = req.body;

    if (!userId || baseSalary === undefined || taxRate === undefined) {
      return res.status(400).json({
        success: false,
        message: 'userId, baseSalary, and taxRate are required',
      });
    }

    const structure = await payrollService.upsertSalaryStructure(userId, {
      baseSalary,
      taxRate,
      standardAllowances: standardAllowances || [],
      standardDeductions: standardDeductions || [],
    });

    return res.status(200).json({
      success: true,
      message: 'Salary structure saved successfully',
      data: structure,
    });
  } catch (error) {
    next(error);
  }
};

//ADMIN or STAFF get salary structure for a specific employee
const getSalaryStructure = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const structure = await payrollService.getSalaryStructure(userId);

    return res.status(200).json({
      success: true,
      data: structure,
    });
  } catch (error) {
    next(error);
  }
};

export {
  generatePayroll,
  getEmployeePayslips,
  getPayslipById,
  upsertSalaryStructure,
  getSalaryStructure,
};