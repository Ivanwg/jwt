const userService = require('../services/user')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/api')
const ResponseSecureDto = require('../dto/response-secure')

class UserController {
  async register(req, res, next) {
    try {
      // TODO - ошибки возвращать в виде словаря
      const errors = validationResult(req.body)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Некорректные данные', errors.array()))
      }
      const { email, password } = req.body
      const userData = await userService.register(email, password)
      const responseSecureDto = new ResponseSecureDto(userData)
      res.cookie('refreshToken', responseSecureDto.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      return res.json(responseSecureDto.getSecure())
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await userService.login(email, password)
      const responseSecureDto = new ResponseSecureDto(userData)
      res.cookie('refreshToken', responseSecureDto.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      return res.json(responseSecureDto.getSecure())
    } catch (error) {
      next(error)
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (error) {
      next(error)
    }
  }

  async verify(req, res, next) {
    try {
      const link = req.params.link
      await userService.verify(link)
      return res.redirect(process.env.CLIENT_URL)
    } catch (error) {
      next(error)
    }
  }

  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const userData = await userService.refresh(refreshToken)
      const responseSecureDto = new ResponseSecureDto(userData)
      res.cookie('refreshToken', responseSecureDto.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      return res.json(responseSecureDto.getSecure())
    } catch (error) {
      next(error)
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers()
      return res.json(users)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController()