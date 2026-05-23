import Attendance from '../../models/attendance.js'
import mongoose from 'mongoose'
import EmployeeProfile from '../../models/employeeProfileModel.js'

const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate({
      path: 'employeeId',
      populate: {
        path: 'departmentId'
      }
    })

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance
    })
  } catch (error) {
    console.log(error.message)

    res.status(500).json({
      success: false,
      message: 'Unable to fetch attendance'
    })
  }
}

const getSingleAttendance = async (req, res) => {
  try {
    const employeeId = req.params.id

    const attendance = await Attendance.findOne({
      employeeId: employeeId
    }).populate({
      path: 'employeeId',
      select: 'firstName lastName',
      populate: {
        path: 'departmentId',
        select: 'name'
      }
    })

    res.status(200).json({
      success: true,
      data: attendance
    })
  } catch (error) {
    console.log(error.message)

    res.status(500).json({
      success: false,
      message: 'Unable to fetch attendance'
    })
  }
}

export { getAttendance, getSingleAttendance }
