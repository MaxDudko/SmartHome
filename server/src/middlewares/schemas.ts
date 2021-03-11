import { Joi } from 'express-validation'

export const registerSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    fullName: Joi.string().required(),
  }),
}

export const loginSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}

export const profileSchema = {
  payload: Joi.object({
    email: Joi.string().email().required(),
  }),
}

export const resetPasswordSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
}

export const checkPasswordTokenSchema = {
  query: Joi.object({
    token: Joi.string().required(),
  }),
}

export const refreshPasswordSchema = {
  body: Joi.object({
    password: Joi.string().required(),
    token: Joi.string().required(),
  }),
}

export const findHomeSchema = {
  body: Joi.object({
    userId: Joi.string().required(),
  }),
}

export const selectHomeSchema = {
  body: Joi.object({
    userId: Joi.string().required(),
    homeId: Joi.string().required(),
  }),
}

export const createHomeSchema = {
  body: Joi.object({
    userId: Joi.string().required(),
    homeName: Joi.string().required(),
    homeAddress: Joi.string().required(),
    key: Joi.string().required(),
  }),
}

export const joinHomeSchema = {
  body: Joi.object({
    userId: Joi.string().required(),
    homeId: Joi.string().required(),
    key: Joi.string().required(),
  }),
}

export const accessTokenSchema = {
  query: Joi.object({
    code: Joi.string().required(),
  }),
}

export const saveTokenSchema = {
  body: Joi.object({}),
}

export const getDevicesSchema = {
  body: Joi.object({
    homeId: Joi.string().required(),
  }),
}

export const updateStateSchema = {
  body: Joi.object({
    state: Joi.object().required(),
  }),
}

export const lockToggleSchema = {
  body: Joi.object({
    homeId: Joi.string().required(),
  }),
}
