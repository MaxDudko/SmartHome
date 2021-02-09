import axios from 'axios'

export const tokenValidationService = (request) => {
  const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/profile`
  const token = request.token

  if (token) {
    return axios
      .post(API_ENDPOINT, {
        token,
      })
      .then((data) => {
        return data
      })
      .catch(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('homeId')
        window.location.reload()
      })
  }
}

export const registerUserService = (request) => {
  const REGISTER_API_ENDPOINT = `${process.env.REACT_APP_API_URL}/register`
  const data = request.data

  return axios.post(REGISTER_API_ENDPOINT, { ...data }).then((response) => {
    const token = response.data.user.token
    localStorage.setItem('token', token)
    window.location.reload()
  })
}

export const loginUserService = (request) => {
  const LOGIN_API_ENDPOINT = `${process.env.REACT_APP_API_URL}/login`
  const data = request.data

  return axios.post(LOGIN_API_ENDPOINT, { ...data }).then((response) => {
    const token = response.data.user.token
    localStorage.setItem('token', token)
    window.location.reload()
  })
}

export const changePasswordService = (request) => {
  const LOGIN_API_ENDPOINT = `${process.env.REACT_APP_API_URL}/change-password`
  const data = request.data

  return axios.post(LOGIN_API_ENDPOINT, { ...data }).then((response) => {
    return response.data.user.token
  })
}
