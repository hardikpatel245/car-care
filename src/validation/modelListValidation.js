const Joi = require('joi')
  
//User-defined function to validate the user
module.exports = validateUser = (cardId)=>  {
    const JoiSchema = Joi.object({
        car_id: Joi.number()
                  .required(),
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(cardId)
}