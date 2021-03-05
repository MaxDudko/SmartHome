export const appReadyAction = () => {
  return {
    type: 'APP_READY',
  }
}

export const authModalAction = (url: string) => {
  return {
    type: 'AUTH_MODAL',
    payload: {
      url,
    },
  }
}

export const openModalAction = () => {
  return {
    type: 'OPEN_MODAL',
  }
}

export const openDevicesSidebarAction = () => {
  return {
    type: 'OPEN_DEVICES_SIDEBAR',
  }
}

export const responseErrorAction = (error: Error) => {
  return {
    type: 'RESPONSE_ERROR',
    payload: {
      error,
    },
  }
}
