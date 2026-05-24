import mongoose from 'mongoose'

const allowanceDeductionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative']
    }
  },
  { _id: false }
)

const salaryStructureSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmployeeProfile',
      required: [true, 'Employee ID is required'],
      unique: true // One active salary structure per employee
    },
    baseSalary: {
      type: Number,
      required: [true, 'Base salary is required'],
      min: [0, 'Base salary cannot be negative']
    },
    taxRate: {
      // Store as decimal e.g. 0.15 = 15%
      type: Number,
      required: [true, 'Tax rate is required'],
      min: [0, 'Tax rate cannot be negative'],
      max: [1, 'Tax rate must be between 0 and 1 (e.g. 0.15 for 15%)']
    },
    standardAllowances: {
      type: [allowanceDeductionSchema],
      default: []
    },
    standardDeductions: {
      type: [allowanceDeductionSchema],
      default: []
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

const SalaryStructure = mongoose.model('SalaryStructure', salaryStructureSchema)

export default SalaryStructure
