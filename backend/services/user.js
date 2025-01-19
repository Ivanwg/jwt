const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const MailService = require('./mail')
const TokenService = require('./token')
const UserDto = require('../dto/user')
const ApiError = require('../exceptions/api')

class UserService {
  async register(email, password) {
    const checkedUser = await UserModel.findOne({ email })
    if (checkedUser) {
      throw ApiError.BadRequest(`Пользователь с email ${email} уже существует`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()
    const user = await UserModel.create({ email, password: hashPassword, activationLink })
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(userDto.id, tokens.refreshToken)
    await MailService.sendActivation(email, `${process.env.API_URL}/api/verify/${activationLink}`)

    return {
      ...tokens,
      user: userDto
    }
  }

  async verify(verificationLink) {
    const user = await UserModel.findOne({ verificationLink })
    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка верификции')
    }
    user.isVerified = true
    await user.save()
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw ApiError.BadRequest(`Пользователь с таким email не найден`)
    }
    const isPasswordsEqual = await bcrypt.compare(password, user.password)
    if (!isPasswordsEqual) {
      throw ApiError.BadRequest('Неверный пароль')
    }
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = TokenService.validateRefresh(refreshToken)
    const dbToken = await TokenService.getRefreshToken(refreshToken)
    if (!userData || !dbToken) {
      throw ApiError.UnauthorizedError()
    }
    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async getUsers() {
    const users = await UserModel.find()
  }
}

module.exports = new UserService()