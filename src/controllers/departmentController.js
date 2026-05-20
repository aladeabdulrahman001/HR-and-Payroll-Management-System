import Department from '../models/departmentModel.js'

const createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: department
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate(
      'managerId',
      'email role'
    )

    res.status(200).json({
      success: true,
      count: departments.length,
      data: departments
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export { createDepartment, getDepartments }
