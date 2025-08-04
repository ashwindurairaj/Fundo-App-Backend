import HttpStatus from 'http-status-codes'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const saltRounds = 10
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret' // Use env variable in production

export const newUser = async (body) => {
  try {
    const user = await User.findOne({ email: body.email })
    if (user) {
      return { code: 409, data: [], message: "User already exists" }
    }

    body.password = await bcrypt.hash(body.password, saltRounds)
    const newUser = await User.create(body)

    return { code: 201, data: newUser, message: "User created successfully!" }
  } catch (err) {
    console.error(err)
    return { code: 500, data: [], message: "Error creating user" }
  }
}

export const userLogin = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return { code: 404, data: [], message: "No user found" }
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return { code: 401, data: [], message: "Invalid credentials" }
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    return {
      code: 200,
      data: {
        id: user._id,
        email: user.email,
        token,
      },
      message: "Login successful"
    }
  } catch (err) {
    console.error(err)
    return { code: 500, data: [], message: "Error during login" }
  }
}
