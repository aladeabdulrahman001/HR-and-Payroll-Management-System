import Attendance from '../models/attendance.js'
import EmployeeProfile from '../models/employeeProfileModel.js'

const clockIn = async (req, res) => {
  try {
    const userId = req.user.userId
    const employee = await EmployeeProfile.findOne({ userId })
    const employeeId = employee._id
    const attendance = await Attendance.create({
      employeeId,
      date: new Date(),
      clockIn: new Date()
    })

    const populateAttendance = await Attendance.findById(
      attendance._id
    ).populate('employeeId', 'email role')

    res.status(201).json({
      success: true,
      message: 'Clock in successful',
      data: populateAttendance
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'unable to clock in'
    })
  }
}

export default clockIn
