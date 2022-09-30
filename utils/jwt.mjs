import JWT from 'jsonwebtoken'

// generates token for user
export const generateToken = (payload) => {
  const token = JWT.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h',
  })
  return token
}

export const isAuthenticated = (req, res, next) => {
  // get bearer token
  const authorization = req.headers.authorization

  // check if token is available of not
  if (authorization) {
    // authorization is available, now get the user token
    let token = null
    try {
      token = authorization.slice(7, authorization.length)
    } catch (error) {
      // unknown error occurred while getting token
      res.status(400).json({
        status: false,
        message: 'Unknown error occurred, please try after some time',
      })
    }
    if (token) {
      // checking if token is valid or not
      JWT.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (!err) {
          // token is verified and attached to the request
          req.user = decoded
          next()
        } else {
          // this token is expired, ask user to re-login
          res.status(401).json({
            status: false,
            message: 'This token is expired.',
          })
        }
      })
    } else {
      // this toke is invalid
      res.status(400).json({
        status: false,
        message: 'Please send a valid token.',
      })
    }
  } else {
    // token is not found in the request
    res.status(401).json({
      status: false,
      message: 'Token not found',
    })
  }
}
