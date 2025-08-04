import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Match your login service

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    // This now matches your login token structure: { id, email }
    const userData = await jwt.verify(bearerToken, JWT_SECRET);
    res.locals.user = userData; // Contains { id, email }
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};