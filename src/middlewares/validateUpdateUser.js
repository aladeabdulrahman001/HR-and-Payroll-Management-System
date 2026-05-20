import User from '../models/userModel.js'

const validateUpdateUser = async (req, res, next) => {
  const userId = req.user.userId
  const { password } = req.body

  const existingUser = await User.findById(userId)

  if (!existingUser) {
    return res
      .status(404)
      .json({ success: false, error: { message: 'User not found' } })
  }

  next()
}

export default validateUpdateUser
