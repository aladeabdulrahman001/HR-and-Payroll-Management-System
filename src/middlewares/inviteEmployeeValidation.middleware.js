const validateInviteEmployee = async (req, res, next) => {
  try {
    const {
      email,
      firstName,
      lastName,
      phone,
      departmentId,
    } = req.body;

    // Required fields (departmentId removed)
    if (!email || !firstName || !lastName || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided',
      });
    }

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // Optional department validation
    if (departmentId) {
      if (!mongoose.Types.ObjectId.isValid(departmentId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid departmentId',
        });
      }

      const department = await Department.findById(departmentId);

      if (!department) {
        return res.status(404).json({
          success: false,
          message: 'Department not found',
        });
      }
    }

    // Existing user check
    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.isActive) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Existing employee check
    const existingEmployee = await EmployeeProfile.findOne({
      phone,
      isActive: true,
    });

    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message: 'Employee already exists',
      });
    }

    next();
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      success: false,
      message: 'Validation failed',
    });
  }
};

export default validateInviteEmployee;