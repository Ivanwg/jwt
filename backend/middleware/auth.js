const ApiError = require('../exceptions/api')
const token = require('../models/token')
const tokenService = require('../services/token')

module.exports = function (req, res, next) {
  if (req.user) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return next(ApiError.UnAuthorizedError())
    }

    const accessToken = authHeader.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.UnAuthorizedError())
    }
    const userData = tokenService.validateAccess(accessToken)
    if (!userData) {
      return next(ApiError.UnAuthorizedError())
    }
    req.user = userData
    next()
  } else {
    return next(ApiError.UnAuthorizedError())
  }
}