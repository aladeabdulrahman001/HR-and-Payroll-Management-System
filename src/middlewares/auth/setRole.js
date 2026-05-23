const setRole = (role) => (req, res, next) => {
  req.body = req.body || {}
  req.body.role = role
  next()
}

export default setRole
