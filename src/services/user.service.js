import HttpStatus from 'http-status-codes';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { sendMail } from '../config/email.js';
const saltRounds = 10;
//Create new User
export const newUser = async (body) => {
  try {
    // check if user already exists
    const checkUser = await User.findOne({
      email: body.email
    });
    if (checkUser) {
      return {
        code: HttpStatus.CONFLICT,
        data: [],
        message: 'User already exists'
      };
    }
    //hash password
    const hashedPass = await bcrypt.hash(body.password, saltRounds);

    const data = await User.create({
      ...body,
      password: hashedPass
    });

    return {
      code: HttpStatus.CREATED,
      data,
      message: 'User created successfully!'
    };
  } catch (error) {
    console.error(error);
    return {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      data: [],
      message: 'Error occured while creating user'
    };
  }
};

export const userLogin = async ({ email, password }) => {
  try {
    const checkUser = await User.findOne({
      email: email
    });
    console.log('User email ', checkUser);
    if (!checkUser) {
      return {
        code: HttpStatus.NOT_FOUND,
        data: [],
        message: 'no user found'
      };
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch) {
      return {
        code: HttpStatus.UNAUTHORIZED,
        data: [],
        message: 'Invalid Credentials'
      };
    }
    const token = jwt.sign(
      { email: checkUser.email, id: checkUser._id },
      process.env.ACCESS_TOKEN_KEY
    );

    // return success
    return {
      code: HttpStatus.OK,
      data: {
        id: checkUser._id,
        email: checkUser.email,
        token: token
      },
      message: 'Login successful and token generated'
    };
  } catch (error) {
    //login error catch
    console.error(error);
    return {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      data: [],
      message: 'Error occured during login'
    };
  }
};

export const forgotPass = async ({ email }) => {
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return {
        code: HttpStatus.NOT_FOUND,
        data: data,
        message: 'No user found'
      };
    }
    //Generate a token
    const token = jwt.sign(
      { id: checkUser._id, email: checkUser.email },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: '15m' }
    );
    console.log('Generated Reset Token: ', token);

    //TODO: here ----> Send token via email to the user using nodemailer

    //send token via mail
    const emailSent = await sendMail(email,token);
    if (!emailSent) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: [],
        message: 'Failed to send reset email'
      };
    }

    return {
      code: HttpStatus.OK,
      data: { token },
      message: 'Password reset token generated successfully!!'
    };
  } catch (error) {
    console.error('Error in forgot password: ', error);
    return {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      data: [],
      message: 'Error Occured during forgot password!'
    };
  }
};

export const resetPass = async ({email, newPassword}) => {
    try {
        const user = await User.findOne({email})
        if(!user) {
            return {
                code : HttpStatus.NOT_FOUND,
                data : [],
                message : "User not found"
            }
        }
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds)
        user.password = hashedPassword
        await user.save()

        return {
            code : HttpStatus.OK,
            data : { id: user._id, email: user.email },
            message : 'Password reset successfully!!'
        }
    }
    catch(error) {
        console.error("Error resetting password: ", error)
        return {
            code : HttpStatus.INTERNAL_SERVER_ERROR,
            data : [],
            message : 'Error resetting password'
        }
    }
}