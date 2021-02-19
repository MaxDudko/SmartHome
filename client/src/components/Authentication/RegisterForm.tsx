import React, { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-materialize'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { registerUserAction } from '../../actions/userActions'
import logo from '../../images/logo.png'
import { UserState } from '../../reducers/userReducer'
import styles from './Authentication.module.scss'

interface Props {
  responseError: string
  registerUserAction: any
}

const RegisterForm: React.FC<Props> = (props) => {
  const { registerUserAction, responseError } = props
  const [data, setData] = useState<any>({})
  const [errors, throwErrors] = useState<string>('')

  useEffect(() => {
    throwErrors(responseError)
  }, [responseError])

  const validateData = (data) => {
    const { email, password, confirmPassword } = data

    if (
      !email.match(/^([a-zA-Z0-9._-]+@[a-zA-Z]+.[a-zA-Z]{2,4})$/) ||
      !(email.length > 5 && email.length < 64)
    ) {
      throwErrors('Email not valid')
      return false
    }

    if (!password.match(/^(?=.*[A-Za-z0-9])(?=.*\d)[A-Za-z0-9\d]{8,64}$/)) {
      throwErrors('Password must be at least 8-64 A-Z, a-z, 0-9')
      return false
    }

    if (password !== confirmPassword) {
      throwErrors('Passwords not identical')
      return false
    }

    return true
  }

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.id]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const isValid = validateData(data)
    if (isValid) {
      registerUserAction(data)
      return <Redirect to="/overview" />
    }
  }

  return (
    <div className={styles.authForm + ' col s12 m5 push-m7'}>
      <div className={styles.header}>
        <img src={logo} alt="SmartHome" />
      </div>
      <form
        className={styles.form + ' col s10 m8'}
        style={{ marginLeft: 0 }}
        onSubmit={handleSubmit}
      >
        <p className={styles.title}>Sign up</p>
        <TextInput
          email={true}
          id="email"
          onChange={handleChange}
          s={12}
          inputClassName="validate"
          required={true}
          label="Email"
          placeholder=""
        />
        <TextInput
          password={true}
          id="password"
          onChange={handleChange}
          s={12}
          inputClassName="validate"
          required={true}
          label="Password"
          placeholder=""
        />
        <TextInput
          password={true}
          id="confirmPassword"
          onChange={handleChange}
          s={12}
          inputClassName="validate"
          required={true}
          label="Confirm Password"
          placeholder=""
        />
        <TextInput
          id="fullName"
          onChange={handleChange}
          s={12}
          inputClassName="validate"
          required={true}
          label="Full Name"
          placeholder=""
        />
        <span style={{ color: 'red', fontSize: '12px' }}>{errors}</span>
        <Button
          node="button"
          type="submit"
          className={'waves-effect btn col s12'}
          style={{ backgroundColor: '#1f8efa', marginLeft: '20px' }}
        >
          SIGN UP
        </Button>
      </form>
      <div className={styles.links}>
          <span className="col s12" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            By clicking Join now, you agree to the LinkedIn User Agreement, Privacy Policy. and
            Cookie Policy.
          </span>
        <span>
            Already have an account?
            <Link to="/login">
              <span className={styles.link}>Login</span>
            </Link>
          </span>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  responseError: state.app.responseError,
})

const mapDispatchToProps = (dispatch) => ({
  registerUserAction: (data: UserState) => dispatch(registerUserAction(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
