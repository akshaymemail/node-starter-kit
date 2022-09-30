import { validationResult } from 'express-validator'

// validate every request payload based on validators
export const isRequestValidated = (req, res, next) => {
  // get all errors from request payload
  const errors = validationResult(req)
  // check weather there is any missing payload or not
  if (!errors.isEmpty()) {
    // there is some payload that is missing, warn to frontend
    const results = errors.array()
    return res.status(400).json({
      status: false,
      errors: results[0],
    })
  }
  // all checks passed, proceed further
  next()
}
