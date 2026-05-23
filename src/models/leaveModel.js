// models/leaveModel.js
import mongoose from 'mongoose'

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmployeeProfile',
      required: true
    },
    leaveType: {
      type: String,
      enum: ['annual', 'sick', 'maternity', 'paternity', 'unpaid', 'emergency'],
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    reason: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'cancelled'],
      default: 'pending'
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    reviewedAt: {
      type: Date,
      default: null
    },
    comment: {
      type: String,
      default: null,
      trim: true
    }
  },
  { timestamps: true }
)

const Leave = mongoose.model('Leave', leaveSchema)

export default Leave
