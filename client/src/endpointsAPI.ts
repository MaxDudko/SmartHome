import axios from 'axios'
import {
  CREATE_HOME,
  GET_DEVICES,
  GET_HOME_LIST,
  JOIN_HOME,
  LOCK_TOGGLE,
  LOGIN_USER,
  REGISTER_USER,
  SELECT_HOME,
  VALIDATE_TOKEN,
} from './actionTypes'

const sendRequest = (actionType: string, data: any) => {
  const API_URL = process.env.REACT_APP_API_URL

  const getPath = (type: string) => {
    switch (type) {
      case VALIDATE_TOKEN:
        return `/profile`
      case LOGIN_USER:
        return `/login`
      case REGISTER_USER:
        return `/register`
      case GET_HOME_LIST:
        return `/find-home`
      case SELECT_HOME:
        return `/select-home`
      case CREATE_HOME:
        return `/create-home`
      case JOIN_HOME:
        return `/join-home`
      case GET_DEVICES:
        return `/smart-api/get-devices`
      case LOCK_TOGGLE:
        return `/smart-api/lock-toggle`
      default:
        return null
    }
  }

  const url = `${API_URL}${getPath(actionType)}`

  if (url && data) {
    return axios.post(url, data)
  }
}

export default sendRequest
