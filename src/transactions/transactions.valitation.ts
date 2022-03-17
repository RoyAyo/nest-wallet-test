import * as Joi from 'joi';

export const SendMoneyValidation = Joi.object().keys({
  reference: Joi.string().required(),
  amount: Joi.number().required(),
  user: Joi.any().required(),
});
