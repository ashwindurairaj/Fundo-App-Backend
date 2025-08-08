import HttpStatus from 'http-status-codes'
import jwt from 'jsonwebtoken'
/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

export const userAuth = async(req, res, next) => {
    try {
        let bearerToken = req.header('Authorization')
        console.log('BearerToken before splitting -->', bearerToken);
        // console.log(process.env.ACCESS_TOKEN_KEY);
        
        if(!bearerToken)
        throw {
             code : HttpStatus.BAD_REQUEST,
             message : 'Authorization Token is Reguired'   
        }
        //Extracting the token
        bearerToken = bearerToken.split(' ')[1]
        console.log("Bearer token after splitting --> " + bearerToken);
        
        //verify the token
        const user = await jwt.verify(bearerToken, process.env.ACCESS_TOKEN_KEY)
        req.body.createdBy = user.id
        res.locals.user = user
        res.locals.token = bearerToken
        next()
    } catch (error) {
        res.status(HttpStatus.UNAUTHORIZED).json({
            code : HttpStatus.UNAUTHORIZED,
            message : 'Invalid token'
        })
    }
}