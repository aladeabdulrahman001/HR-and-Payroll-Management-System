import User from '../../models/userModel.js'
import EmployeeProfile from '../../models/employeeProfileModel.js'
import sendEmail from '../../utils/sendEmail.js'
import crypto from 'crypto'

const inviteUser = async (req, res) => {
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
  try {
    let user = await User.findOne({ email })

    if (user) {
      const hasEmployeeProfile = await EmployeeProfile.findOne({
        userId: user._id
      })

      if (user.isActive && hasEmployeeProfile) {
        return res.status(409).json({
          success: false,
          error: { message: 'User already has active accounts' }
        })
      }

      if (user.isActive && !hasEmployeeProfile) {
        await EmployeeProfile.create({
          userId: user._id,
          firstName,
          lastName,
          phone,
          address,
          departmentId,
          jobTitle,
          hireDate
        })

        return res.status(201).json({
          success: true,
          message: 'Employee profile created for existing user'
        })
      }
    }

    const inviteToken = crypto.randomBytes(32).toString('hex')
    const inviteExpiry = Date.now() + 24 * 60 * 60 * 1000

    if (user) {
      await user.set({ inviteToken, inviteExpiry }).save()
    } else {
      user = await User.create({
        email,
        password: null,
        role,
        isActive: false,
        inviteToken,
        inviteExpiry
      })

      await EmployeeProfile.create({
        userId: user._id,
        firstName,
        lastName,
        phone,
        address,
        departmentId,
        jobTitle,
        hireDate
      })
    }

    const link = `${process.env.CLIENT_URL}/setup-account?token=${inviteToken}`
    await sendEmail({
      to: email,
      subject: 'Account Invitation',
      text: `Hi ${firstName}, you have been invited as ${role}. Set up your account here: ${link}. This link expires in 24 hours. If it expires, request a new one at ${process.env.CLIENT_URL}/resend-invite`
    })

    res.status(201).json({
      success: true,
      message: `${role} invited successfully`
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({
      success: false,
      error: { message: 'Could not invite user' }
    })
  }
}

export default inviteUser
