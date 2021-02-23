import { UserState } from '../reducers/userReducer'

export const tokenValidationAction = (token: string) => {
  return {
    type: 'VALIDATE_TOKEN',
    token,
  }
}

export const loginUserAction = (data: UserState) => {
  return {
    type: 'LOGIN_USER',
    data,
  }
}

export const logoutUserAction = () => {
  return {
    type: 'LOGOUT_USER',
  }
}

export const registerUserAction = (data: UserState) => {
  return {
    type: 'REGISTER_USER',
    data,
  }
}

export const resetPasswordAction = (data: object) => {
  return {
    type: 'RESET_PASSWORD',
    data,
  }
}

export const refreshPasswordAction = (data: object) => {
  return {
    type: 'REFRESH_PASSWORD',
    data,
  }
}

export const saveUserDataAction = (data: UserState) => {
  return {
    type: 'SAVE_USER_DATA',
    payload: {
      user: data,
    },
  }
}

export const removeUserDataAction = () => {
  return {
    type: 'REMOVE_USER_DATA',
  }
}

export const saveHomeListAction = (data: object[]) => {
  return {
    type: 'SAVE_HOME_LIST',
    payload: {
      homeList: data,
    },
  }
}
