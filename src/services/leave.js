import Leave from '../models/leaveModel.js'
import EmployeeProfile from '../models/employeeProfileModel.js'
import User from '../models/userModel.js'
import sendEmail from '../utils/sendEmail.js'

// request leave
export const requestLeaveService = async ({
  userId,
  leaveType,
  startDate,
  endDate,
  reason
}) => {
  const employeeProfile = await EmployeeProfile.findOne({ userId })

  if (!employeeProfile) throw new Error('Employee profile not found')

  if (new Date(startDate) < new Date())
    throw new Error('Cannot request leave for past dates')

  if (new Date(startDate) > new Date(endDate))
    throw new Error('Start date cannot be after end date')

  const overlappingLeave = await Leave.findOne({
    employeeId: employeeProfile._id,
    status: { $in: ['pending', 'approved'] },
    $or: [
      { startDate: { $lte: new Date(endDate), $gte: new Date(startDate) } },
      { endDate: { $lte: new Date(endDate), $gte: new Date(startDate) } }
    ]
  })

  if (overlappingLeave)
    throw new Error(
      'You already have a pending or approved leave on these dates'
    )

  const leave = await Leave.create({
    employeeId: employeeProfile._id,
    leaveType,
    startDate,
    endDate,
    reason
  })

  return leave
}

// get my leaves
export const getMyLeavesService = async ({ userId }) => {
  const employeeProfile = await EmployeeProfile.findOne({ userId })

  if (!employeeProfile) throw new Error('Employee profile not found')

  const leaves = await Leave.find({ employeeId: employeeProfile._id }).sort({
    createdAt: -1
  })

  return leaves
}

// cancel leave
export const cancelLeaveService = async ({ leaveId, userId }) => {
  const employeeProfile = await EmployeeProfile.findOne({ userId })

  if (!employeeProfile) throw new Error('Employee profile not found')

  const leave = await Leave.findById(leaveId)

  if (!leave) throw new Error('Leave request not found')

  if (leave.employeeId.toString() !== employeeProfile._id.toString())
    throw new Error('You are not authorized to cancel this leave request')

  if (leave.status !== 'pending')
    throw new Error('Only pending leave requests can be cancelled')

  await leave.set({ status: 'cancelled' }).save()

  return leave
}

// get all leaves
export const getLeavesService = async () => {
  const leaves = await Leave.find({ status: { $ne: 'cancelled' } })
    .populate('employeeId', 'firstName lastName jobTitle')
    .populate('reviewedBy', 'email')
    .sort({ createdAt: -1 })

  return leaves
}

// get specific employee leaves
export const getEmployeeLeavesService = async ({ employeeId }) => {
  const leaves = await Leave.find({ employeeId, status: { $ne: 'cancelled' } })
    .populate('employeeId', 'firstName lastName jobTitle')
    .sort({ createdAt: -1 })

  return leaves
}

// review leave
export const reviewLeaveService = async ({
  leaveId,
  status,
  comment,
  hrUserId
}) => {
  const leave = await Leave.findById(leaveId)
    .populate({
      path: 'employeeId',
      select: 'firstName lastName jobTitle departmentId userId',
      populate: {
        path: 'departmentId',
        select: 'name description'
      }
    })
    .populate({
      path: 'reviewedBy',
      select: 'email role'
    })

  if (!leave) throw new Error('Leave request not found')

  if (leave.status !== 'pending')
    throw new Error('Leave request has already been reviewed')

  if (!['approved', 'rejected'].includes(status))
    throw new Error('Invalid status. Must be approved or rejected')

  // check HR is not reviewing their own leave
  const hrEmployeeProfile = await EmployeeProfile.findOne({ userId: hrUserId })

  if (leave.employeeId._id.toString() === hrEmployeeProfile._id.toString())
    throw new Error('You cannot review your own leave request')

  await leave
    .set({
      status,
      comment: comment || null,
      reviewedBy: hrUserId,
      reviewedAt: Date.now()
    })
    .save()

  // notify employee via email
  const employeeUser = await User.findById(leave.employeeId.userId)

  await sendEmail({
    to: employeeUser.email,
    subject: 'Leave Request Update',
    text: `Hi ${leave.employeeId.firstName}, your leave request from ${leave.startDate.toDateString()} to ${leave.endDate.toDateString()} has been ${status}.${comment ? ` ${comment}` : ''}`
  })

  return leave
}
