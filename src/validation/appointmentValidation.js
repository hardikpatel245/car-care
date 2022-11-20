const Joi = require('joi')
  
//User-defined function to validate the user
module.exports = validateUser = (user)=>  {
    const JoiSchema = Joi.object({
        car_model: Joi.string()
                  .min(1)
                  .max(30)
                  .required(),
        car_id: Joi.string()
                  .min(1)
                  .max(30)
                  .required(),
        service_type: Joi.string()
                  .optional(),
        date: Joi.string()
                .min(1)
                .required(),
        time: Joi.string()
               .min(1)
               .max(50)
               .required(),
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
}