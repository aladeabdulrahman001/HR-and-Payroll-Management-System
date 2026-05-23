import mongoose from 'mongoose'

// validate request leave
export const requestLeaveValidation = (req, res, next) => {
  const { leaveType, startDate, endDate, reason } = req.body

  if (!leaveType?.trim() || !startDate || !endDate || !reason?.trim()) {
    return res.status(400).json({
      success: false,
      error: { message: 'All fields are required' }
    })
  }

  const validLeaveTypes = [
    'annual',
    'sick',
    'maternity',
    'paternity',
    'unpaid',
    'emergency'
  ]
  if (!validLeaveTypes.includes(leaveType)) {
    return res.status(400).json({
      success: false,
      error: {
        message: `Invalid leave type. Must be one of: ${validLeaveTypes.join(', ')}`
      }
    })
  }

  if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
    return res.status(400).json({
      success: false,
      error: { message: 'Invalid date format. Use YYYY-MM-DD' }
    })
  }

  next()
}

// validate review leave
export const reviewLeaveValidation = (req, res, next) => {
  const { status } = req.body

  if (!status?.trim()) {
    return res.status(400).json({
      success: false,
      error: { message: 'Status is required' }
    })
  }

  const validStatuses = ['approved', 'rejected']
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      error: { message: 'Invalid status. Must be approved or rejected' }
    })
  }

  next()
}

// validate leave id param
export const leaveIdValidation = (req, res, next) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      error: { message: 'Invalid leave ID' }
    })
  }

  next()
}
