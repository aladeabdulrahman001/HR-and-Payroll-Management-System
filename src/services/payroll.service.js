import SalaryStructure from '../models/salaryStructure.model.js'
import Payslip from '../models/payslip.model.js'
import Attendance from '../models/attendance.js'
import Leave from '../models/leaveModel.js' // your team's leave model

//Count working days (Mon–Fri) in a given month/year
const getWorkingDaysInMonth = (year, month) => {
  const daysInMonth = new Date(year, month, 0).getDate()
  let workingDays = 0

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day)
    const dayOfWeek = date.getDay() // 0 = Sunday, 6 = Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      workingDays++
    }
  }

  return workingDays
}

//Count how many approved unpaid leave days fall within the target month
//Handles leaves that may span across month boundaries
const countUnpaidLeaveDaysInMonth = (leaveRecords, year, month) => {
  const monthStart = new Date(year, month - 1, 1)
  const monthEnd = new Date(year, month, 0)

  let totalUnpaidDays = 0

  leaveRecords.forEach((leave) => {
    const leaveStart = new Date(leave.startDate)
    const leaveEnd = new Date(leave.endDate)

    // Find overlap between the leave period and the target month
    const overlapStart = leaveStart < monthStart ? monthStart : leaveStart
    const overlapEnd = leaveEnd > monthEnd ? monthEnd : leaveEnd

    if (overlapStart <= overlapEnd) {
      // Only count weekdays within the overlap
      let current = new Date(overlapStart)
      while (current <= overlapEnd) {
        const day = current.getDay()
        if (day !== 0 && day !== 6) {
          totalUnpaidDays++
        }
        current.setDate(current.getDate() + 1)
      }
    }
  })

  return totalUnpaidDays
}

const calculatePayroll = (
  salaryStructure,
  attendanceRecords,
  unpaidLeaveDays,
  year,
  month
) => {
  const { baseSalary, taxRate, standardAllowances, standardDeductions } =
    salaryStructure

  const workingDaysInMonth = getWorkingDaysInMonth(year, month)

  //based on actual clockIn/totalHours fields
  const daysPresent = attendanceRecords.filter(
    (r) => r.clockIn !== null && r.totalHours > 0
  ).length

  // Daily rate used to prorate unpaid leave deduction
  const dailyRate = baseSalary / workingDaysInMonth
  const unpaidLeaveDeduction = parseFloat(
    (dailyRate * unpaidLeaveDays).toFixed(2)
  )

  // Sum all allowances and standard deductions
  const totalAllowances = standardAllowances.reduce(
    (sum, a) => sum + a.amount,
    0
  )
  const totalStandardDeductions = standardDeductions.reduce(
    (sum, d) => sum + d.amount,
    0
  )

  // Gross = Base + Allowances (before tax and other deductions)
  const grossPay = parseFloat((baseSalary + totalAllowances).toFixed(2))

  // Tax applied on gross pay
  const taxAmount = parseFloat((grossPay * taxRate).toFixed(2))

  // Total deductions = standard deductions + unpaid leave proration
  const totalDeductions = parseFloat(
    (totalStandardDeductions + unpaidLeaveDeduction).toFixed(2)
  )

  // Net = Gross - Tax - Deductions
  const netPay = parseFloat((grossPay - taxAmount - totalDeductions).toFixed(2))

  return {
    baseSalary,
    taxRate,
    totalAllowances: parseFloat(totalAllowances.toFixed(2)),
    grossPay,
    taxAmount,
    totalDeductions,
    unpaidLeaveDeduction,
    netPay,
    workingDaysInMonth,
    daysPresent,
    unpaidLeaveDays,
    allowancesSnapshot: standardAllowances,
    deductionsSnapshot: standardDeductions
  }
}

const generatePayroll = async (userId, month, year, generatedBy) => {
  //Idempotency check
  const existingPayslip = await Payslip.findOne({ userId, month, year })
  if (existingPayslip) {
    return { created: false, payslip: existingPayslip }
  }

  const salaryStructure = await SalaryStructure.findOne({
    userId,
    isActive: true
  })
  if (!salaryStructure) {
    const error = new Error(
      'No active salary structure found for this employee'
    )
    error.statusCode = 404
    throw error
  }

  const monthStart = new Date(year, month - 1, 1)
  const monthEnd = new Date(year, month, 0, 23, 59, 59)

  const attendanceRecords = await Attendance.find({
    employeeId: userId,
    date: { $gte: monthStart, $lte: monthEnd }
  })

  // Remember to adjust 'leaveType' and 'status' values to match team's Leave model exactly once you see it
  const unpaidLeaveRecords = await Leave.find({
    userId,
    status: 'approved',
    leaveType: 'unpaid',
    startDate: { $lte: monthEnd },
    endDate: { $gte: monthStart }
  })

  const unpaidLeaveDays = countUnpaidLeaveDaysInMonth(
    unpaidLeaveRecords,
    year,
    month
  )

  const computed = calculatePayroll(
    salaryStructure,
    attendanceRecords,
    unpaidLeaveDays,
    year,
    month
  )

  const payslip = await Payslip.create({
    userId,
    month,
    year,
    generatedBy,
    ...computed
  })

  return { created: true, payslip }
}

const getEmployeePayslips = async (userId) => {
  return Payslip.find({ userId }).sort({ year: -1, month: -1 })
}

const getPayslipById = async (payslipId) => {
  const payslip = await Payslip.findById(payslipId).populate({
    path: 'userId',
    select: 'email role' // only expose safe fields from User
  })

  if (!payslip) {
    const error = new Error('Payslip not found')
    error.statusCode = 404
    throw error
  }

  return payslip
}

//Create or update a salary structure for an employee.
// Uses upsert so calling it twice is safe.
const upsertSalaryStructure = async (userId, data) => {
  const structure = await SalaryStructure.findOneAndUpdate(
    { userId },
    { ...data, userId },
    { returnDocument: 'after', upsert: true, runValidators: true }
  )
  return structure
}

const getSalaryStructure = async (userId) => {
  const structure = await SalaryStructure.findOne({ userId, isActive: true })
  if (!structure) {
    const error = new Error('Salary structure not found for this employee')
    error.statusCode = 404
    throw error
  }
  return structure
}

export {
  generatePayroll,
  getEmployeePayslips,
  getPayslipById,
  upsertSalaryStructure,
  getSalaryStructure
}
