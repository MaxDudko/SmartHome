const validate = (data, errorHandler) => {
  const { email, password, confirmPassword, homeName, homeAddress, key } = data

  if (
    email &&
    (!email.match(/^([a-zA-Z0-9._-]+@[a-zA-Z]+.[a-zA-Z]{2,4})$/) ||
      !(email.length > 5 && email.length < 64))
  ) {
    errorHandler('Email not valid')
    return false
  }

  if (password && !password.match(/^(?=.*[A-Za-z0-9])(?=.*\d)[A-Za-z0-9\d]{8,64}$/)) {
    errorHandler('Password must be at least 8-64 A-Z, a-z, 0-9')
    return false
  }

  if (password && password !== confirmPassword) {
    errorHandler('Passwords not identical')
    return false
  }

  if (homeName && (homeName.length < 3 || homeName.length > 32)) {
    errorHandler('Home name not valid')
    return false
  }

  if (homeAddress && (homeAddress.length < 3 || homeAddress.length > 32)) {
    errorHandler('Home address not valid')
    return false
  }

  if (key && !key.match(/^(?=.*[A-Za-z0-9])(?=.*\d)[A-Za-z0-9\d]{4,32}$/)) {
    errorHandler('Security key must be at least 8-64 A-Z, a-z, 0-9')
    return false
  }

  return true
}

export default validate
