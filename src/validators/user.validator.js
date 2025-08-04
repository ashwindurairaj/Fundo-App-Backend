import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
    const schema = Joi.object({
        firstName : Joi.string()
                    .min(3)
                    .pattern(/^[A-Z][A-Za-z]+$/)
                    .required(),
        lastName: Joi.string()
                    .pattern(/^[A-Za-z]+$/)
                    .optional()
                    .allow('', null),
        email: Joi.string()
                    .email({tlds : {allow: false}})
                    .min(3)
                    .required(),
        password : Joi.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}'))
                    .required()
    })
    const {error, value} = schema.validate(req.body)
    if(error){
        next(error)
    } else {
        req.validateBody = value
        next()
    }
}