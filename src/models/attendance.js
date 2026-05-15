import mongoose from 'mongoose'

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmployeeProfile',
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    clockIn: {
      type: Date,
      required: true
    },

    clockOut: {
      type: Date,
      default: null
    },

    totalHours: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

const Attendance = mongoose.model('Attendance', attendanceSchema)

export default Attendance
