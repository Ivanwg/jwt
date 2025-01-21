const jwt = require('jsonwebtoken')
const TokenModel = require('../models/token')

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15s' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '20s' })

    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId, refreshToken) {
    const checkedToken = await TokenModel.findOne({ user: userId })
    if (checkedToken) {
      checkedToken.refresh = refreshToken
      return checkedToken.save()
    }
    const token = await TokenModel.create({ user: userId, refresh: refreshToken })
    return token
  }

  async removeToken(refreshToken) {
    const token = await TokenModel.deleteOne({ refreshToken })
    return token
  }


  async getRefreshToken(refresh) {
    const token = await TokenModel.findOne({ refresh })
    return token
  }

  validateAccess(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch (error) {
      return null
    }
  }
  validateRefresh(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch (error) {
      return null
    }
  }
} 

module.exports = new TokenService()