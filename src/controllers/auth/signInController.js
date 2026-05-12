import jwt from 'jsonwebtoken'

const signInController = (req, res) => {
  const user = req.user

  try {
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    res.status(200).json({ success: true, message: 'login successful', token })
  } catch (err) {
    console.error(err.message)
    return res
      .status(500)
      .json({ success: false, error: { message: 'could not generate token' } })
  }
}

export default signInController
