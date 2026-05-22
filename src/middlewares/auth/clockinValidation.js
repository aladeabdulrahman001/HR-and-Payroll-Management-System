import mongoose from 'mongoose'
import Attendance from '../../models/attendance.js'
import EmployeeProfile from '../../models/employeeProfileModel.js';

const clockinValidation = async (req, res, next) => {
  const userId = req.user.userId
  const employee = await EmployeeProfile.findOne({ userId })
  const employeeId = employee._id
  if (!employeeId) {
    return res
      .status(400)
      .json({ success: false, error: { message: 'invalid credentials' } })
  }

  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID'
    })
  }
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const endOfDay = new Date()
  endOfDay.setHours(23, 59, 59, 999)
  try {
    const existingAttendance = await Attendance.findOne({
      employeeId,
      date: {
        $gte: today,
        $lte: endOfDay
      },
      clockOut: null
    })

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: 'Employee already clocked in and has not clocked out'
      })
    }
    next()
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'an error occured'
    })
  }
}

export default clockinValidation
