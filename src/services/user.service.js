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
      return { code: HttpStatus.BAD_REQUEST, data: [], message: "User already exists" , success: false }
    }

    body.password = await bcrypt.hash(body.password, saltRounds)
    const newUser = await User.create(body)

    return { code: HttpStatus.CREATED, data: newUser, message: "User created successfully!" ,success: true }
  } catch (err) {
    console.error(err)
    return { code: HttpStatus.BAD_REQUEST, data: [], message: "Error creating user" }
  }
}

export const userLogin = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return { code: HttpStatus.BAD_REQUEST, data: [], message: "No user found" , success: false}
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return { code: HttpStatus.BAD_REQUEST, data: [], message: "Invalid credentials", success: false }
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    return {
      code: HttpStatus.OK,
      data: {
        id: user._id,
        email: user.email,
        token,
      },
      message: "Login successful",
      success: true
    }
  } catch (err) {
    console.error(err)
    return { code: HttpStatus.BAD_REQUEST, data: [], message: "Error during login" , success: false }
  }
}
