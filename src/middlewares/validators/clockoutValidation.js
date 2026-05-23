import mongoose from 'mongoose'
import EmployeeProfile from '../../models/employeeProfileModel.js'
import Attendance from '../../models/attendance.js'

const clockoutValidation = async (req, res, next) => {
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
    const attendance = await Attendance.findOne({
      employeeId,
      date: {
        $gte: today,
        $lte: endOfDay
      },
      clockOut: null
    })

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'No active clock-in found'
      })
    }
    next()
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'an error occured' })
  }
}

export default clockoutValidation
