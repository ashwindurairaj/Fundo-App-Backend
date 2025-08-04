import Joi from '@hapi/joi';

export const createNoteValidator = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string()
                  .min(1)
                  .max(100)
                  .trim()
                  .required(),
        description: Joi.string()
                        .max(1000)
                        .trim()
                        .optional()
                        .allow('', null),
        color: Joi.string()
                  .pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
                  .optional()
                  .allow('', null),
        isArchive: Joi.boolean()
                      .optional(),
        trash: Joi.boolean()
                  .optional()
    })
    
    const {error, value} = schema.validate(req.body)
    if(error){
        next(error)
    } else {
        req.validateBody = value
        next()
    }
}

export const updateNoteValidator = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string()
                  .min(1)
                  .max(100)
                  .trim()
                  .optional(),
        description: Joi.string()
                        .max(1000)
                        .trim()
                        .optional()
                        .allow('', null),
        color: Joi.string()
                  .pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
                  .optional()
                  .allow('', null),
        isArchive: Joi.boolean()
                      .optional(),
        trash: Joi.boolean()
                  .optional()
    })
    
    const {error, value} = schema.validate(req.body)
    if(error){
        next(error)
    } else {
        req.validateBody = value
        next()
    }
}