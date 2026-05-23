import { getEmployeeLeavesService } from '../../services/leave.js'

const getEmployeeLeaves = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      success: false,
      error: { message: 'Employee ID is required' }
    })
  }
  try {
    const leaves = await getEmployeeLeavesService({ employeeId: id })

    res.status(200).json({
      success: true,
      data: leaves
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({
      success: false,
      error: {
        message: err.message || 'Could not fetch employee leave requests'
      }
    })
  }
}

export default getEmployeeLeaves
