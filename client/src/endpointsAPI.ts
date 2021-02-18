import axios from 'axios'
import {
  CREATE_HOME, GET_DEVICES,
  GET_HOME_LIST,
  JOIN_HOME, LOCK_TOGGLE,
  LOGIN_USER,
  REGISTER_USER,
  SELECT_HOME,
  VALIDATE_TOKEN
} from './actionTypes'

const sendRequest = (actionType: string, data: any) => {
  const API_URL = process.env.REACT_APP_API_URL

  const getURL = (type: string) => {
    switch (type) {
      case VALIDATE_TOKEN:
        return `${API_URL}/profile`
      case LOGIN_USER:
        return `${API_URL}/login`
      case REGISTER_USER:
        return `${API_URL}/register`
      case GET_HOME_LIST:
        return `${API_URL}/find-home`
      case SELECT_HOME:
        return `${API_URL}/select-home`
      case CREATE_HOME:
        return `${API_URL}/create-home`
      case JOIN_HOME:
        return `${API_URL}/join-home`
      case GET_DEVICES:
        return `${API_URL}/smart-api/get-devices`
      case LOCK_TOGGLE:
        return `${API_URL}/smart-api/lock-toggle`
      default:
        return null
    }
  }

  return axios.post(getURL(actionType) as string, data)
}

export default sendRequest
