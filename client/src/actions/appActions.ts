export const openAddDeviceModalAction = () => {
  return {
    type: 'OPEN_ADD_DEVICE_MODAL_ACTION',
  }
}

export const closeAddDeviceModalAction = () => {
  return {
    type: 'CLOSE_ADD_DEVICE_MODAL_ACTION',
  }
}

export const responseErrorAction = (error) => {
  return {
    type: 'RESPONSE_ERROR',
    payload: {
      error,
    },
  }
}
