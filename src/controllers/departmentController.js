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
<<<<<<< HEAD
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
=======
  console.log(error.message);

  res.status(500).json({
    success: false,
    message: 'Unable to create department',
  });
}
    
};
>>>>>>> main

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

<<<<<<< HEAD
export { createDepartment, getDepartments }
=======
export default {
  createDepartment,
  getDepartments,
}
>>>>>>> main
