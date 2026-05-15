import Attendance from '../../models/attendance.js'

const clockoutValidation = async (req, res, next) => {
  const { employeeId } = req.body

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
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'an error occured' })
  }
  next()
}

export default clockoutValidation
