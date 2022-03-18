import * as Joi from 'joi';

export const SendMoneyValidation = Joi.object().keys({
  reference: Joi.string().required(),
  amount: Joi.number().positive().required(),
  user: Joi.any().required(),
});

export const DepositMoneyValidation = Joi.object().keys({
  user: Joi.any().required(),
  amount: Joi.number().positive().required(),
});
