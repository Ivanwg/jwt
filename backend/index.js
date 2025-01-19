require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./router/index') 
const errorMiddleware = require('./middleware/error')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))
app.use('/api', router)
app.use(errorMiddleware)

const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
    })
    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))

  } catch (error) {
    console.log('Ошибка')
    console.log(error)
  }
}

start()