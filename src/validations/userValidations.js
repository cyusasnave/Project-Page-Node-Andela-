import Joi from "joi";

const userValidationSchema = Joi.object({
  firstName: Joi.string().required().regex(/^[A-Za-z]+$/).messages({
    "string.empty": "First name field can't be empty!",
    "string.pattern.base": "First name field can't include numbers and special characters "
  }),
  lastName: Joi.string().required().regex(/^[A-Za-z]+$/).messages({
    "string.empty": "Last name field can't be empty!",
    "string.pattern.base": "Last name field can't include numbers and special characters "
  }),
  email: Joi.string().required().email().messages({
    "string.empty": "Email field can't be empty!",
    "string.email": "Invalid email"
  }),
  password: Joi.string().required().regex(/^(?=.*[^a-zA-Z0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/).messages({
    "string.empty": "Password field can't be empty!",
    "string.pattern.base": "Password should start with a special character,\n Include Capitals, number and min 8 characters!"
  }),
  repeatPassword: Joi.string().required().equal(Joi.ref("password")).messages({
    "any.only": "Please confirm a matching Password!"
  })
})

export default userValidationSchema;