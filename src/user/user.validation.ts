import * as Joi from 'joi';

export const loginUserValidation = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const RegisterUserValidation = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  fullName: Joi.string().required(),
  username: Joi.string().required(),
  phone: Joi.string().required(),
});
