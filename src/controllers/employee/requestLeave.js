import { requestLeaveService } from '../../services/leave.js'

const requestLeave = async (req, res) => {
  const { leaveType, startDate, endDate, reason } = req.body
  try {
    const leave = await requestLeaveService({
      userId: req.user.userId,
      leaveType,
      startDate,
      endDate,
      reason
    })

    res.status(201).json({
      success: true,
      message: 'Leave request submitted successfully',
      data: leave
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({
      success: false,
      error: { message: err.message || 'Could not submit leave request' }
    })
  }
}

export default requestLeave
