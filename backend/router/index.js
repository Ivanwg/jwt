const Router = require('express').Router
const UserController = require('../controllers/user')
const { body } = require('express-validator')
const authMiddleware = require('../middleware/auth')

const router = new Router()

router.post('/register',
  body('email').isEmail(),
  body('password').isLength({ min: 7 }), 
  UserController.register)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/verify/:link', UserController.verify)
router.get('/refresh', UserController.refresh)
// TODO - delete 
// router.get('/users', authMiddleware, UserController.getUsers)

module.exports = router