import React, { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-materialize'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { refreshPasswordAction } from '../../actions/userActions'
import logo from '../../images/logo.png'
import styles from './Authentication.module.scss'

interface Props {
  responseError: string
  refreshPasswordAction: Function
}

const RefreshForm: React.FC<Props> = (props) => {
  const { refreshPasswordAction, responseError } = props
  const [token, setToken] = useState('')
  const [data, setData] = useState<any>({})
  const [errors, throwErrors] = useState<string>('')

  useEffect(() => {
    const search = window.location.search
    const params = new URLSearchParams(search)
    const token = params.get('token')

    if (token) {
      setToken(token)
    }
  }, [])
  useEffect(() => {
    throwErrors(responseError)
  }, [responseError])

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.id]: event.target.value,
    })
  }

  const validateData = (data) => {
    const { password, confirmPassword } = data

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

  const handleSubmit = (event) => {
    event.preventDefault()

    const valid = validateData(data)

    if (valid && token) {

      refreshPasswordAction({
        ...data,
        token,
      })

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
        <p className={styles.title}>Forgot Password</p>
        <div className={styles.restoreText} />
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
        <span style={{ color: 'red', fontSize: '12px' }}>{errors}</span>
        <Button
          node="button"
          type="submit"
          className="waves-effect btn col s12"
          style={{ backgroundColor: '#1f8efa', marginLeft: '20px' }}
        >
          RECOVER PASSWORD
        </Button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  responseError: state.app.responseError,
})

const mapDispatchToProps = (dispatch) => ({
  refreshPasswordAction: (data: object) => dispatch(refreshPasswordAction(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RefreshForm)
