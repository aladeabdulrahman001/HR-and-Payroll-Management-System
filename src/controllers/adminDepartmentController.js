import Department from '../models/departmentModel.js';

const createDepartment = async (
  req,
  res
) => {
  try {
    const department =
      await Department.create(req.body);

    return res.status(201).json({
      success: true,
      message:
        'Department created successfully',
      data: department,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      success: false,
      message:
        'Unable to create department',
    });
  }
};

export default {
  createDepartment,
};