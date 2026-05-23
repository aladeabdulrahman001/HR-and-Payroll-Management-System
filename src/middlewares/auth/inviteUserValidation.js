import { isValidObjectId } from 'mongoose'
import Department from '../../models/departmentModel.js'
import { isValidPhoneNumber } from 'libphonenumber-js'

const inviteUserValidation = async (req, res, next) => {
  const {
    email,
    firstName,
    lastName,
    phone,
    address,
    departmentId,
    jobTitle,
    hireDate,
    role
  } = req.body

  if (
    !email?.trim() ||
    !firstName?.trim() ||
    !lastName?.trim() ||
    !address?.trim() ||
    !phone?.trim() ||
    !departmentId?.trim() ||
    !jobTitle?.trim() ||
    !hireDate
  ) {
    return res.status(400).json({
      success: false,
      error: { message: 'All fields are required' }
    })
  }

  if (role && !['ADMIN', 'HRM', 'STAFF'].includes(role)) {
    return res.status(400).json({
      success: false,
      error: { message: 'Invalid role specified' }
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: { message: 'Invalid email format' }
    })
  }

  if (!isValidPhoneNumber(phone)) {
    return res.status(400).json({
      success: false,
      error: {
        message:
          'Invalid phone number. Please include country code e.g +2349016185592'
      }
    })
  }

  if (hireDate && isNaN(Date.parse(hireDate))) {
    return res.status(400).json({
      success: false,
      error: { message: 'Invalid hire date format' }
    })
  }

  if (!isValidObjectId(departmentId)) {
    return res.status(400).json({
      success: false,
      error: { message: 'Invalid department ID' }
    })
  }

  const departmentExists = await Department.findById(departmentId)

  if (!departmentExists) {
    return res.status(404).json({
      success: false,
      error: { message: 'Department not found' }
    })
  }
  next()
}

export default inviteUserValidation
