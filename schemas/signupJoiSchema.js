const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const signupSchema = Joi.object({
  password: Joi.string().required().min(8),
  email: Joi.string().pattern(emailRegexp).required(),
});

module.exports = {
  signupSchema,
};
