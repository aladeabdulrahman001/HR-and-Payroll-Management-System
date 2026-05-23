import { cancelLeaveService } from '../../services/leave.js'

const cancelLeave = async (req, res) => {
  const { id } = req.params
  try {
    await cancelLeaveService({ leaveId: id, userId: req.user.userId })

    res.status(200).json({
      success: true,
      message: 'Leave request cancelled successfully'
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({
      success: false,
      error: { message: err.message || 'Could not cancel leave request' }
    })
  }
}

export default cancelLeave
