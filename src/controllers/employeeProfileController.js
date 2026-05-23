import EmployeeProfile from '../models/employeeProfileModel.js'

const getEmployees = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    const filter = { isActive: true }

    if (req.query.departmentId) {
      filter.departmentId = req.query.departmentId
    }

    const sort = req.query.sort || 'createdAt'

    const employees = await EmployeeProfile.find(filter)
      .populate('departmentId', 'name')
      .populate('userId', 'email role')
      .sort(sort)
      .skip(skip)
      .limit(limit)

    res.status(200).json({
      success: true,
      count: employees.length,
      page,
      data: employees
    })
  } catch (error) {
    console.log(error.message)

    res.status(500).json({
      success: false,

      message: 'Unable to fetch employees'
    })
  }
}

const deactivateEmployee = async (req, res) => {
  try {
    const employee = await EmployeeProfile.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    )

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Employee deactivated successfully',
      data: employee
    })
  } catch (error) {
    console.log(error.message)

    res.status(500).json({
      success: false,
      message: 'Unable to deactivate employee'
    })
  }
}

export { getEmployees, deactivateEmployee }
