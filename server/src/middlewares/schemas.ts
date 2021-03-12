import { Joi } from 'express-validation'

const emailSchema = Joi.string()
  .email()
  .min(5)
  .max(64)
  .pattern(/^([a-zA-Z0-9._-]+@[a-zA-Z]+.[a-zA-Z]{2,4})$/)

const passwordSchema = Joi.string().pattern(/^(?=.*[A-Za-z0-9])(?=.*\d)[A-Za-z0-9\d]{8,64}$/)

const resetPasswordTokenSchema = Joi.string().hex().length(64).required()

const idSchema = Joi.string()
  .max(64)
  .pattern(/^[0-9]*$/)

const keySchema = Joi.string().pattern(/^(?=.*[A-Za-z0-9])(?=.*\d)[A-Za-z0-9\d]{4,32}$/)

const fieldSchema = Joi.string().max(64)

const smartAppTokenSchema = Joi.string().pattern(/^[0-9a-z-]*$/)

export const registerSchema = {
  body: Joi.object({
    email: emailSchema.required(),
    password: passwordSchema.required(),
    fullName: fieldSchema.required(),
  }),
}

export const loginSchema = {
  body: Joi.object({
    email: emailSchema.required(),
    password: passwordSchema.required(),
  }),
}

export const profileSchema = {
  payload: Joi.object({
    email: emailSchema,
  }),
}

export const resetPasswordSchema = {
  body: Joi.object({
    email: emailSchema.required(),
  }),
}

export const checkPasswordTokenSchema = {
  query: Joi.object({
    token: resetPasswordTokenSchema.required(),
  }),
}

export const refreshPasswordSchema = {
  body: Joi.object({
    password: passwordSchema.required(),
    token: resetPasswordTokenSchema.required(),
  }),
}

export const findHomeSchema = {
  body: Joi.object({
    userId: idSchema.required(),
  }),
}

export const selectHomeSchema = {
  body: Joi.object({
    userId: idSchema.required(),
    homeId: idSchema.required(),
  }),
}

export const createHomeSchema = {
  body: Joi.object({
    userId: idSchema.required(),
    homeName: fieldSchema.required(),
    homeAddress: fieldSchema,
    key: keySchema.required(),
  }),
}

export const joinHomeSchema = {
  body: Joi.object({
    userId: idSchema.required(),
    homeId: idSchema.required(),
    key: keySchema.required(),
  }),
}

export const accessTokenSchema = {
  query: Joi.object({
    code: smartAppTokenSchema.required(),
  }),
}

export const saveTokenSchema = {
  body: Joi.object({}),
}

export const getDevicesSchema = {
  body: Joi.object({
    homeId: idSchema.required(),
  }),
}

export const updateStateSchema = {
  body: Joi.object({
    state: Joi.object().required(),
  }),
}

export const lockToggleSchema = {
  body: Joi.object({
    homeId: idSchema.required(),
  }),
}
