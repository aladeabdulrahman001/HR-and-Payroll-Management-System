import Attendance from '../../models/attendance.js'
import EmployeeProfile from '../../models/employeeProfileModel.js'
import calculateTotalHours from '../../services/attendanceClockout.js'

const clockOut = async (req, res) => {
  try {
    const userId = req.user.userId
    const employee = await EmployeeProfile.findOne({ userId })
    const employeeId = employee._id

    const attendance = await Attendance.findOne({
      employeeId,
      clockOut: null
    })

    attendance.clockOut = new Date()
    attendance.totalHours = calculateTotalHours(
      attendance.clockIn,
      attendance.clockOut
    ).toFixed(2)

    await attendance.save()

    const populateAttendance = await Attendance.findById(
      attendance._id
    ).populate({
      path: 'employeeId',
      select: 'firstName lastName',
      populate: {
        path: 'departmentId',
        select: 'name'
      }
    })
    res.status(200).json({
      success: true,
      message: 'Clock out successful',
      data: populateAttendance
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'unable to clockout'
    })
  }
}

export default clockOut
