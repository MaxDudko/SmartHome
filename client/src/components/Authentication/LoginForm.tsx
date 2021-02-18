import React, { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-materialize'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { loginUserAction } from '../../actions/userActions'
import logo from '../../images/logo.png'
import { UserState } from '../../reducers/userReducer'
import styles from './Authentication.module.scss'

interface Props {
  responseError: string
  loginUserAction: any
}

const LoginForm: React.FC<Props> = (props) => {
  const { loginUserAction, responseError } = props
  const [data, setData] = useState<any>({})
  const [errors, throwErrors] = useState<string>('')

  useEffect(() => {
    throwErrors(responseError)
  }, [responseError])

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.id]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    loginUserAction(data)
    return <Redirect to="/overview" />
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
        <p className={styles.title}>Sign in</p>
        <TextInput
          email={true}
          id="email"
          onChange={(e) => handleChange(e)}
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
        <span style={{ color: 'red', fontSize: '12px' }}>{errors}</span>
        <Button
          node="button"
          type="submit"
          className="waves-effect btn col s12"
          style={{ backgroundColor: '#1f8efa', marginLeft: '20px' }}
        >
          SIGN IN
        </Button>
        <div className={styles.links}>
          <Link to="/restore">
            <span className={styles.linkRestore}>Forgot your password?</span>
          </Link>
          <span>
            Don't have an account?
            <Link to="/register">
              <span className={styles.link}>Sign up</span>
            </Link>
          </span>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  responseError: state.app.responseError,
})

const mapDispatchToProps = (dispatch) => ({
  loginUserAction: (data: UserState) => dispatch(loginUserAction(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
