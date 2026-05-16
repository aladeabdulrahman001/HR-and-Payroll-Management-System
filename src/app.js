import express from 'express'
import { PORT } from './utils/env.js'
import connectToDatabase from './utils/mongoose.js'
import authRouter from './routes/auth.routes.js'
import adminRouter from './routes/adminRoutes.js'
import errorMiddleware from './middlewares/error.middleware.js'
import cookieParser from 'cookie-parser'

const app = express()

//Helps  process form data sent in via html form
app.use(express.urlencoded({ extended: false }))

//Reads cookies from incoming requests so app can store user data
app.use(cookieParser())

app.use(errorMiddleware)
app.use(express.json())
app.use('/api/v1/auth', authRouter)
app.use('/api/admin', adminRouter)

app.get('/', (req, res) => {
  res.send('Welcome to the HR and Payroll Management System API')
})

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)
  await connectToDatabase()
})
