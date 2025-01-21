const userService = require('../services/user')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/api')

class UserController {
  async register(req, res, next) {
    try {
      // TODO - ошибки возвращать в виде словаря
      const errors = validationResult(req.body)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Некорректные данные', errors.array()))
      }
      const { email, password } = req.body
      const useData = await userService.register(email, password)
      res.cookie('refreshToken', useData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      // TODO - delete refresh from
      return res.json(useData)
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const useData = await userService.login(email, password)
      res.cookie('refreshToken', useData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      // TODO - delete refresh from
      return res.json(useData)
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
      const useData = await userService.refresh(refreshToken)
      console.log(useData)
      res.cookie('refreshToken', useData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      // TODO - delete refresh from
      return res.json(useData)
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