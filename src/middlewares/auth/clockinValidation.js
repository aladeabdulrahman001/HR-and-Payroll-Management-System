import Attendance from '../../models/attendance.js'

const clockinValidation = async (req, res, next) => {
  const { employeeId } = req.body
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
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'an error occured'
    })
  }

  next()
}

export default clockinValidation
