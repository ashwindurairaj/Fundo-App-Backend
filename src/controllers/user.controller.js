import * as UserService from '../services/user.service.js';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const newUser = async (req, res, next) => {
  try {
    const data = await UserService.newUser(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    console.log('Error occured while created a user: ' + error);
  }
};

export const userLogin = async (req, res) => {
  //error handle
  try {
    const data = await UserService.userLogin(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    console.log('Error occured while login: ' + error);
  }
};

export const forgotPass = async(req, res) => {
  try {
    const data = await UserService.forgotPass(req.body)
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    })
  } catch(error) {
    console.error("Error in forgot password Controller: ", error);
  }
}

export const resetPass = async(req, res) => {
  try {
    const data = await UserService.resetPass(req.body)
    res.status(data.code).json({
      code : data.code,
      data : data.data,
      message : data.message
    })
  } catch (error){
    console.error("Error in Reset password Controller: " , error)
  }
}