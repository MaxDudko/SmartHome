import {
  LOGIN_USER,
  LOGOUT_USER,
  REFRESH_PASSWORD,
  REGISTER_USER,
  RESET_PASSWORD,
  SAVE_HOME_LIST,
  SAVE_USER_DATA,
  VALIDATE_TOKEN,
} from '../actionTypes'
import { UserState } from '../reducers/userReducer'

export const tokenValidationAction = () => {
  return {
    type: VALIDATE_TOKEN,
  }
}

export const loginUserAction = (data: UserState) => {
  return {
    type: LOGIN_USER,
    data,
  }
}

export const logoutUserAction = () => {
  return {
    type: LOGOUT_USER,
  }
}

export const registerUserAction = (data: UserState) => {
  return {
    type: REGISTER_USER,
    data,
  }
}

export const resetPasswordAction = (data: object) => {
  return {
    type: RESET_PASSWORD,
    data,
  }
}

export const refreshPasswordAction = (data: object) => {
  return {
    type: REFRESH_PASSWORD,
    data,
  }
}

export const saveUserDataAction = (data: UserState) => {
  return {
    type: SAVE_USER_DATA,
    payload: {
      user: data,
    },
  }
}

export const saveHomeListAction = (data: object[]) => {
  return {
    type: SAVE_HOME_LIST,
    payload: {
      homeList: data,
    },
  }
}
