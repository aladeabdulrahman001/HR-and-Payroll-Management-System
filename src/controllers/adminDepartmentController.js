import Department from '../models/departmentModel.js';

const createDepartment = async (req, res) => {
  try {
    const { name, description, managerId } = req.body;

    const existingDepartment =
      await Department.findOne({ name });

    if (existingDepartment) {
      return res.status(400).json({
        success: false,
        message: 'Department already exists',
      });
    }

    const department = await Department.create({
      name,
      description,
      managerId,
    });

    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: department,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  createDepartment,
};