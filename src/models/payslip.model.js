import mongoose from 'mongoose'

const payslipSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmployeeProfile',
      required: [true, 'Employee ID is required']
    },
    month: {
      type: Number,
      required: [true, 'Month is required'],
      min: 1,
      max: 12
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: 2000
    },
    baseSalary: {
      type: Number,
      required: true
    },
    totalAllowances: {
      type: Number,
      default: 0
    },
    grossPay: {
      type: Number,
      required: true
    },
    taxRate: {
      type: Number,
      required: true
    },
    taxAmount: {
      type: Number,
      required: true
    },
    totalDeductions: {
      type: Number,
      required: true
    },
    unpaidLeaveDeduction: {
      type: Number,
      default: 0
    },
    netPay: {
      type: Number,
      required: true
    },

    // Snapshots — permanently lock in what the structure looked like at generation time
    // This means future salary changes won't alter historical payslips
    allowancesSnapshot: {
      type: [{ name: String, amount: Number, _id: false }],
      default: []
    },
    deductionsSnapshot: {
      type: [{ name: String, amount: Number, _id: false }],
      default: []
    },

    workingDaysInMonth: {
      type: Number
    },
    daysPresent: {
      type: Number
    },
    unpaidLeaveDays: {
      type: Number,
      default: 0
    },
    generatedAt: {
      type: Date,
      default: Date.now
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // the ADMIN who triggered generation
    },
    status: {
      type: String,
      enum: ['generated', 'released', 'cancelled'],
      default: 'generated'
    }
  },
  {
    timestamps: true
  }
)

// Compound unique index — this is the database-level idempotency guard
// Even if two requests come in simultaneously, only one payslip can exist
// for the same employee + month + year combination
payslipSchema.index({ employeeId: 1, month: 1, year: 1 }, { unique: true })

const Payslip = mongoose.model('Payslip', payslipSchema)

export default Payslip
