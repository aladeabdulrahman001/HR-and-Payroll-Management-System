import { isValidObjectId } from 'mongoose'

const inviteUserValidation = (req, res, next) => {
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
    (!email?.trim() ||
      !firstName?.trim() ||
      !lastName?.trim() ||
      !address?.trim() ||
      !phone?.trim() ||
      !departmentId?.trim() ||
      !jobTitle?.trim() ||
      !hireDate,
    !role?.trim())
  ) {
    return res.status(400).json({
      success: false,
      error: { message: 'All fields are required' }
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: { message: 'Invalid email format' }
    })
  }

  if (!isValidObjectId(departmentId)) {
    return res.status(400).json({
      success: false,
      error: { message: 'Invalid department ID' }
    })
  }

  next()
}

export default inviteUserValidation
