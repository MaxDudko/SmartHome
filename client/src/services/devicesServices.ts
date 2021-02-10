import axios from 'axios'
const SMART_APP_ENDPOINT = '/smart-api'

export const getDevicesService = (request) => {
  const API_ENDPOINT = `${process.env.REACT_APP_API_URL}${SMART_APP_ENDPOINT}/get-devices`
  const data = request.payload

  return axios.post(API_ENDPOINT, data)
}

export const lockToggleService = async (request) => {
  const API_ENDPOINT = `${process.env.REACT_APP_API_URL}${SMART_APP_ENDPOINT}/lock-toggle`
  const data = request.payload

  await axios.post(API_ENDPOINT, data)

  const homeId = localStorage.getItem('homeId')
  const req = {
    payload: {
      homeId: homeId && homeId.toString(),
    },
  }

  return getDevicesService(req)
}
