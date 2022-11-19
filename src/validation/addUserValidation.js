const Joi = require('joi')
  
//User-defined function to validate the user
module.exports = validateUser = (user)=>  {
    const JoiSchema = Joi.object({
      
        carId: Joi.string()
                  .required(),
        name: Joi.string()
                  .min(5)
                  .max(30)
                  .required(),            
        modelId: Joi.string()
                  .required(),
        mobile: Joi.number()
                  .min(10)
                  .max(10)
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
               .max(30)
               .required()
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
}