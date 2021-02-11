import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router'
import { useLocation } from 'react-router-dom'
import { loginUserAction, registerUserAction } from '../../actions/userActions'
import logo from '../../images/logo.png'
import smartHomeLogo from '../../images/smart-home-logo.png'
import styles from './Authentication.module.scss'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import RestoreForm from './RestoreForm'

interface Props {
  registerUserAction: Function
  loginUserAction: Function
}

const Authentication: React.FC<Props> = (props) => {
  const { registerUserAction, loginUserAction } = props
  const location = useLocation()
  const [data, setData] = useState<any>({})
  const [errors, throwErrors] = useState<string>('')

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.id]: event.target.value,
    })
  }

  const validateData = (data) => {
    const { email, password, confirmPassword } = data

    if (
      !email.match(/^([a-zA-Z0-9._-]+@[a-zA-Z]+.[a-zA-Z]{2,4})$/) ||
      !(email.length > 5 && email.length < 64)
    ) {
      throwErrors('Email is not valid')
      return false
    }

    if (password.length < 8) {
      throwErrors('Password must be at least 8 characters')
      return false
    }

    if (!password.match(/^(?=.*[A-Za-z0-9])(?=.*\d)[A-Za-z0-9\d]{8,64}$/)) {
      throwErrors('Password is not valid')
      return false
    }

    if (location.pathname === '/auth/register' && password !== confirmPassword) {
      throwErrors('Passwords are not identical')
      return false
    }

    return true
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (location.pathname === '/auth/login') {
      loginUserAction(data)
      return <Redirect to="/dashboard/overview" />
    }

    if (location.pathname === '/auth/register') {
      const isValid = validateData(data)
      if (isValid) {
        registerUserAction(data)
        return <Redirect to="/dashboard/overview" />
      }
    }
  }

  return (
    <div className={styles.Authentication + ' row'}>
      <div className={styles.welcomeScreen + ' col hide-on-small-only m7'}>
        <div className={styles.header}>
          <img src={smartHomeLogo} alt="SmartHome" />
        </div>
        <div className={styles.slide}>
          <p>Control your home</p>
          <p>Connect your life</p>
        </div>
        <div className={styles.footer}>
          <a href="#">
            <i className={styles.icon + ' material-icons'}>play_circle_filled</i>
          </a>
          <a href="#">See how it works</a>
        </div>
      </div>
      <div className={styles.authForm + ' col s12 m5'}>
        <div className={styles.header}>
          <img src={logo} alt="SmartHome" />
        </div>
        <Route
          path="/auth/register"
          render={() => (
            <RegisterForm handleSubmit={handleSubmit} handleChange={handleChange} errors={errors} />
          )}
        />
        <Route
          path="/auth/login"
          render={() => <LoginForm handleSubmit={handleSubmit} handleChange={handleChange} />}
        />
        <Route
          path="/auth/restore"
          render={() => <RestoreForm handleSubmit={handleSubmit} handleChange={handleChange} />}
        />
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  loginUserAction: (data) => dispatch(loginUserAction(data)),
  registerUserAction: (data) => dispatch(registerUserAction(data)),
})

export default connect(null, mapDispatchToProps)(Authentication)
