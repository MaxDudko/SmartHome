import axios from 'axios'

export const getHomeListService = (request) => {
  const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/find-home`
  const data = request.payload

  return axios.post(API_ENDPOINT, data)
}

export const selectHomeService = (request) => {
  const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/select-home`
  const data = request.payload

  return axios.post(API_ENDPOINT, data)
}

export const createHomeService = (request) => {
  const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/create-home`
  const data = request.payload

  return axios.post(API_ENDPOINT, data)
}

export const joinHomeService = (request) => {
  const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/join-home`
  const data = request.payload

  return axios.post(API_ENDPOINT, data)
}
