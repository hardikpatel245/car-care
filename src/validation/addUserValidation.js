const Joi = require('joi')
  
//User-defined function to validate the user
module.exports = validateUser = (user)=>  {
    const JoiSchema = Joi.object({
      
        name: Joi.string()
                  .min(5)
                  .max(30)
                  .required(),
                    
        email: Joi.string()
               .email()
               .min(5)
               .max(50)
               .optional()
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
}