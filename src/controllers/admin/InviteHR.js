// controllers/admin/inviteHR.js
import User from '../../models/userModel.js'
import Employee from '../../models/employeeModel.js'
import sendEmail from '../../config/nodeMailer.js'
import crypto from 'crypto'

const inviteHR = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    phone,
    department,
    position,
    salary,
    startDate
  } = req.body
  try {
    let user = await User.findOne({ email })

    if (user && user.isActive) {
      return res.status(409).json({
        ok: false,
        error: { message: 'User already exists' }
      })
    }

    const inviteToken = crypto.randomBytes(32).toString('hex')
    const inviteExpiry = Date.now() + 24 * 60 * 60 * 1000

    if (user) {
      await user.set({ inviteToken, inviteExpiry }).save()
    } else {
      user = await User.create({
        email,
        password: null,
        role: 'hr',
        isActive: false,
        inviteToken,
        inviteExpiry
      })

      const count = await Employee.countDocuments()
      const employeeId = `EMP-${String(count + 1).padStart(4, '0')}`

      await Employee.create({
        user: user._id,
        employeeId,
        firstName,
        lastName,
        phone,
        department,
        position,
        salary,
        startDate
      })
    }

    const link = `${process.env.CLIENT_URL}/setup-account?token=${inviteToken}`
    await sendEmail({
      to: email,
      subject: 'HR Account Invitation',
      text: `Hi ${firstName}, you have been invited as an HR. Set up your account here: ${link}. This link expires in 24 hours. If it expires, request a new one at ${process.env.CLIENT_URL}/resend-invite`
    })

    res.status(201).json({
      ok: true,
      message: 'HR invited successfully'
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({
      ok: false,
      error: { message: 'Could not invite HR' }
    })
  }
}

export default inviteHR
