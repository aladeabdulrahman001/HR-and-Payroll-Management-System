import EmployeeProfile from '../models/employeeProfileModel.js'

export const getEmployees = async (req, res) => {
  try {
<<<<<<< HEAD
    // Pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const skip = (page - 1) * limit

    // Filtering
    const filter = {
      isActive: true
    }
=======
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { isActive: true };
>>>>>>> main

    if (req.query.departmentId) {
      filter.departmentId = req.query.departmentId
    }

<<<<<<< HEAD
    // Sorting
    const sort = req.query.sort || 'createdAt'
=======
    const sort = req.query.sort || 'createdAt';
>>>>>>> main

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
    console.log(error.message);

    res.status(500).json({
      success: false,
<<<<<<< HEAD
      message: error.message
    })
=======
      message: 'Unable to fetch employees',
    });
>>>>>>> main
  }
}

export const deactivateEmployee = async (
  req,
  res
) => {
  try {
<<<<<<< HEAD
    const employee = await EmployeeProfile.findByIdAndUpdate(
      req.params.id,
      {
        isActive: false
      },
      {
        new: true
      }
    )
=======
    const employee =
      await EmployeeProfile.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      );
>>>>>>> main

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      })
    }

    res.status(200).json({
      success: true,
<<<<<<< HEAD
      message: 'Employee deactivated successfully',
      data: employee
    })
=======
      message:
        'Employee deactivated successfully',
      data: employee,
    });
>>>>>>> main
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
<<<<<<< HEAD
      message: error.message
    })
  }
}

export { getEmployees, deactivateEmployee }
=======
      message:
        'Unable to deactivate employee',
    });
  }
};
>>>>>>> main
