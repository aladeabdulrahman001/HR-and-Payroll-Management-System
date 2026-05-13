import User from '../../models/userModel.js'

const signUpValidation = async (req, res, next) => {
  const { email, password } = req.body

  if (!email?.trim() || !password?.trim()) {
    return res
      .status(400)
      .json({ success: false, error: { message: 'all fields are required' } })
  }

  const emailReg = /^[^\s@\.]+@[^\s@\.]+\.[^\s@\.]+$/

  if (!emailReg.test(email?.trim())) {
    return res
      .status(400)
      .json({ success: false, error: { message: 'invalid email format' } })
  }

  if (password.trim().length < 8) {
    return res.status(400).json({
      success: false,
      error: { message: 'password must not be less than 8 characters' }
    })
  }

  // const acceptableRoles = ['STAFF', 'USER']
  // if (!acceptableRoles.includes(role?.trim().toUpperCase())) {
  //   return res.status(400).json({
  //     success: false,
  //     error: { message: 'role must either be ADMIN, STAFF or USER' }
  //   })
  // }

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, error: { message: 'user already exists' } })
    }
  } catch (err) {
    console.error(err.message)
    return res
      .status(500)
      .json({ success: false, error: { message: 'an error occurred' } })
  }

  next()
}

export default signUpValidation
