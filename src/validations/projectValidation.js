import Joi from "joi";

const projectValidationSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Please fill the project title field!"
  }),
  description: Joi.string().required().messages({
    "string.empty": "Please describe briefly your project!"
  }),
  link: Joi.string().required().messages({
    "string.empty": "Insert your project link!"
  }),
  user: Joi.string().required().messages({
    "string.empty": "Select project User!"
  })
})

export default projectValidationSchema;