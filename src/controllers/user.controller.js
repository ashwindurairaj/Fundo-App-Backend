
import * as UserService from '../services/user.service.js'

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const newUser = async(req, res, next) => {
    const data = await UserService.newUser(req.body)
    res.status(data.code).json({
        code: data.code,
        data : data.data,
        message: data.message
    })
}

export const userLogin = async(req, res) => {
    const data = await UserService.userLogin(req.body)
    res.status(data.code).json({
        code : data.code ,
        data : data.data,
        message : data .message
    })
}