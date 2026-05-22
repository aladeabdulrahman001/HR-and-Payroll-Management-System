import EmployeeProfile from '../models/employeeProfileModel.js'

const inviteEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      address,
      userId,
      jobTitle,
      departmentId
    } = req.body

    const employeeProfile = await EmployeeProfile.create({
      firstName,
      lastName,
      phone,
      address,
      hireDate: new Date(),
      userId,
      jobTitle,
      departmentId
    })

    res.status(201).json({
      success: true,
      message: 'Employee profile created successfully',
      data: employeeProfile
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export default {
  inviteEmployee
}
