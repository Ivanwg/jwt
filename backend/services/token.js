const jwt = require('jsonwebtoken')
const TokenModel = require('../models/token')

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })

    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId, refreshToken) {
    const checkedToken = await TokenModel.findOne({ user: userId })
    if (checkedToken) {
      checkedToken.refreshToken = refreshToken
      return checkedToken.save()
    }
    const token = await TokenModel.create({ user: userId, refreshToken })
    return token
  }

  async removeToken(refreshToken) {
    const token = await TokenModel.deleteOne({ refreshToken })
    return token
  }


  async getRefreshToken(refreshToken) {
    const token = await TokenModel.findOne({ refreshToken })
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