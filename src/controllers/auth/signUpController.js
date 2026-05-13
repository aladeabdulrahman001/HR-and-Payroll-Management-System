import User from '../../models/userModel.js'
import bcrypt from 'bcrypt'

const signUpController = async (req, res) => {
  const { email, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const createdUser = await User.create({
      email,
      password: hashedPassword,
      role: 'STAFF'
    })

    res.status(201).json({
      success: true,
      message: 'user created successfully',
      data: {
        email: createdUser.email,
        role: createdUser.role,
        createdAt: createdUser.createdAt,
        updatedAt: createdUser.updatedAt
      }
    })
  } catch (err) {
    console.error(err.message)
    return res
      .status(500)
      .json({ success: false, error: { message: 'an error occurred' } })
  }
}

export default signUpController
