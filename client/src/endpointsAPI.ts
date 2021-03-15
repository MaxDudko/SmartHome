import axios from 'axios'
import {
  CREATE_HOME,
  GET_DEVICES,
  GET_HOME_LIST,
  JOIN_HOME,
  LOCK_TOGGLE,
  LOGIN_USER,
  REFRESH_PASSWORD,
  REGISTER_USER,
  RESET_PASSWORD,
  SELECT_HOME,
  VALIDATE_TOKEN,
} from './actionTypes'

const sendRequest = (actionType: string, data: any) => {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'
  const API_PREFIX = process.env.REACT_APP_API_PREFIX || '/api/v1'

  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  const getEndpoint = (type: string) => {
    switch (type) {
      case VALIDATE_TOKEN:
        return {
          path: `/profile`,
          method: GET,
        }
      case LOGIN_USER:
        return {
          path: `/login`,
          method: POST,
        }
      case REGISTER_USER:
        return {
          path: `/register`,
          method: POST,
        }
      case RESET_PASSWORD:
        return {
          path: `/password/reset`,
          method: POST,
        }
      case REFRESH_PASSWORD:
        return {
          path: `/password/refresh`,
          method: POST,
        }
      case GET_HOME_LIST:
        return {
          path: `/home-list`,
          method: GET,
        }
      case SELECT_HOME:
        return {
          path: `/home`,
          method: GET,
        }
      case CREATE_HOME:
        return {
          path: `/create-home`,
          method: POST,
        }
      case JOIN_HOME:
        return {
          path: `/join-home`,
          method: POST,
        }
      case GET_DEVICES:
        return {
          path: `/smart-api/devices`,
          method: GET,
        }
      case LOCK_TOGGLE:
        return {
          path: `/smart-api/lock-toggle`,
          method: POST,
        }
      default:
        return null
    }
  }

  const getHeaders = (token) => {
    if (token) {
      return {
        authorization: token,
      }
    } else {
      return {}
    }
  }

  const { path, method } = getEndpoint(actionType) || {}
  if (path && method) {
    const url = `${API_URL}${API_PREFIX}${path}${
      method === GET ? '?' + new URLSearchParams(data).toString() : ''
    }`
    const token = localStorage.getItem('token')
    const headers = getHeaders(token)

    // @ts-ignore
    return axios({
      method,
      url,
      headers,
      data,
    })
  }
}

export default sendRequest
