import { reviewLeaveService } from '../../services/leave.js'

const reviewLeave = async (req, res) => {
  const { id } = req.params
  const { status, comment } = req.body
  try {
    const leave = await reviewLeaveService({
      leaveId: id,
      status,
      comment,
      hrUserId: req.user.userId
    })

    res.status(200).json({
      success: true,
      message: `Leave request ${status} successfully`,
      data: leave
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({
      success: false,
      error: { message: err.message || 'Could not review leave request' }
    })
  }
}

export default reviewLeave
