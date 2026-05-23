import EmployeeProfile from '../models/employeeProfileModel.js'

const inviteEmployee = async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      phone,
      address,
      userId,
      jobTitle,
      departmentId
    } = req.body

    let user = await User.findOne({ email })

    // Generate invite token
    const inviteToken = crypto.randomBytes(32).toString('hex')

    const inviteExpiry = Date.now() + 24 * 60 * 60 * 1000

    // Existing inactive user
    if (user) {
      user.inviteToken = inviteToken

      user.inviteExpiry = inviteExpiry

      await user.save()
    } else {
      // Create inactive user
      user = await User.create({
        email,
        password: null,
        role: 'employee',
        isActive: false,
        inviteToken,
        inviteExpiry
      })

      // Create employee profile
      await EmployeeProfile.create({
        userId: user._id,
        firstName,
        lastName,
        phone,
        address,
        hireDate,
        jobTitle,
        departmentId
      })
    }

    // Invitation link
    const link =
      `${process.env.CLIENT_URL}` + `/setup-account?token=${inviteToken}`

    // Send email
    await sendEmail({
      to: email,
      subject: 'Employee Invitation',
      text: `Hi ${firstName}, ` + `set up your account here: ` + `${link}`
    })

    return res.status(200).json({
      success: true,

      message: 'Employee invited successfully'
    })
  } catch (error) {
    console.log(error.message)

    return res.status(500).json({
      success: false,

      message: 'Could not invite employee'
    })
  }
}

export default {
  inviteEmployee
}
