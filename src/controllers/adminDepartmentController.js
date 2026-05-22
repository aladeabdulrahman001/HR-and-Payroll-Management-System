import Department from '../models/departmentModel.js';

export const createDepartment = async (
  req,
  res
) => {
  try {
    const {
      name,
      description,
      managerId,
    } = req.body;

    const department =
      await Department.create({
        name,
        description,
        managerId,
      });

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

export const getDepartments = async (
  req,
  res
) => {
  try {
    const departments =
      await Department.find();

    return res.status(200).json({
      success: true,
      data: departments,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      success: false,
      message:
        'Unable to fetch departments',
    });
  }
};