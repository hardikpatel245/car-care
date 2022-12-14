const Joi = require('joi')
  
//User-defined function to validate the user
module.exports = validateUser = (user)=>  {
    const JoiSchema = Joi.object({
        first_name: Joi.string()
                  .min(1)
                  .max(30)
                  .required(),
        last_name: Joi.string()
                  .min(1)
                  .max(30)
                  .required(),
        mobile: Joi.string()
                  .min(10)
                  .required(),
        isAdmin: Joi.number()
                  .required(),
        email: Joi.string()
               .email()
               .min(5)
               .max(50)
               .required(),
        password: Joi.string()
               .min(5)
               .required()
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
}