import { getMyLeavesService } from '../../services/leave.js'

const getMyLeaves = async (req, res) => {
  try {
    const leaves = await getMyLeavesService({ userId: req.user.userId })

    res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({
      success: false,
      error: { message: err.message || 'Could not fetch leave requests' }
    })
  }
}

export default getMyLeaves
