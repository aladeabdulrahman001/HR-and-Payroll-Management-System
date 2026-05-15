import Attendance from '../models/attendance.js'
import calculateTotalHours from '../service/attendanceClockout.js'

const clockOut = async (req, res) => {
  try {
    const { employeeId } = req.body

    const attendance = await Attendance.findOne({
      employeeId,
      clockOut: null
    })

    attendance.clockOut = new Date()
    attendance.totalHours = calculateTotalHours(
      attendance.clockIn,
      attendance.clockOut
    )

    await attendance.save()

    const populateAttendance = await Attendance.findById(
      attendance._id
    ).populate('employeeId', 'email role')

    res.status(200).json({
      success: true,
      message: 'Clock out successful',
      totalHours: attendance.totalHours.toFixed(2),
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
