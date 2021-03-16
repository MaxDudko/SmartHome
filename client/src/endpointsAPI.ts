import axios from 'axios'

const sendRequest = (actionType: string, data: any) => {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'
  const API_PREFIX = process.env.REACT_APP_API_PREFIX || '/api/v1'

  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  const endpoints = {
    VALIDATE_TOKEN: {
      path: `/profile`,
      method: GET,
    },
    LOGIN_USER: {
      path: `/login`,
      method: POST,
    },
    REGISTER_USER: {
      path: `/register`,
      method: POST,
    },
    RESET_PASSWORD: {
      path: `/password/reset`,
      method: POST,
    },
    REFRESH_PASSWORD: {
      path: `/password/refresh`,
      method: POST,
    },
    GET_HOME_LIST: {
      path: `/home-list`,
      method: GET,
    },
    SELECT_HOME: {
      path: `/home`,
      method: GET,
    },
    CREATE_HOME: {
      path: `/create-home`,
      method: POST,
    },
    JOIN_HOME: {
      path: `/join-home`,
      method: POST,
    },
    GET_DEVICES: {
      path: `/smart-api/devices`,
      method: GET,
    },
    LOCK_TOGGLE: {
      path: `/smart-api/lock-toggle`,
      method: POST,
    },
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

  const { path, method } = endpoints[actionType] || {}
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
