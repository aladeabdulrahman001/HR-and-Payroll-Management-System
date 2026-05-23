import mongoose from 'mongoose'

import Department from '../../models/departmentModel.js'

const validateDepartmentCreation = async (req, res, next) => {
  try {
    const { name, description, managerId } = req.body

    // Required fields
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name and description are required'
      })
    }

    // Check duplicate department
    const existingDepartment = await Department.findOne({
      name
    })

    if (existingDepartment) {
      return res.status(409).json({
        success: false,
        message: 'Department already exists'
      })
    }

    // Optional managerId validation
    if (managerId && !mongoose.Types.ObjectId.isValid(managerId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid managerId'
      })
    }

    next()
  } catch (error) {
    console.log(error.message)

    return res.status(500).json({
      success: false,
      message: 'Validation failed'
    })
  }
}

export default validateDepartmentCreation
