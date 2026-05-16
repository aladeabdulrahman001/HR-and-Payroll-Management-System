import mongoose from 'mongoose';

import EmployeeProfile from '../models/employeeProfileModel.js';
import Department from '../models/departmentModel.js';

const inviteEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      address,
      hireDate,
      jobTitle,
      departmentId,
    } = req.body;

    // Required fields
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !departmentId
    ) {
      return res.status(400).json({
        success: false,
        message:
          'All required fields must be provided',
      });
    }

    // Validate ObjectId
    if (
      !mongoose.Types.ObjectId.isValid(
        departmentId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid departmentId',
      });
    }

    // Check department existence
    const department =
      await Department.findById(
        departmentId
      );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found',
      });
    }

    // Check duplicate employee
    const existingEmployee =
      await EmployeeProfile.findOne({
        phone,
        isActive: true,
      });

    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message:
          'Employee already exists',
      });
    }

    // Create employee
    const employee =
      await EmployeeProfile.create({
        firstName,
        lastName,
        phone,
        address,
        hireDate,
        jobTitle,
        departmentId,
      });

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