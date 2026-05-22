import mongoose from 'mongoose'
import Attendance from '../../models/attendance.js'
import EmployeeProfile from '../../models/employeeProfileModel.js'

const attendanceValidation = async (req, res, next) => {
  const employeeId = req.params.id

  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID'
    })
  }

  const attendance = await Attendance.findOne({
    employeeId: employeeId
  })

  if (!attendance) {
    return res.status(404).json({
      success: false,
      message: 'Attendance not found'
    })
  }
  next()
}
export default attendanceValidation
