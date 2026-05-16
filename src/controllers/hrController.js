import EmployeeProfile from '../models/employeeProfileModel.js';

const inviteEmployee = async (req, res) => {
  try {
    const employee =
      await EmployeeProfile.create(req.body);

    return res.status(201).json({
      success: true,
      message:
        'Employee created successfully',
      data: employee,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      success: false,
      message:
        'Unable to create employee',
    });
  }
};

export default {
  inviteEmployee,
};