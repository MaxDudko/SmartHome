import React, { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-materialize'
import { connect } from 'react-redux'
import { resetPasswordAction } from '../../actions/userActions'
import logo from '../../images/logo.png'
import styles from './Authentication.module.scss'

interface Props {
  responseError: string
  resetPasswordAction: Function
}

const RestoreForm: React.FC<Props> = (props) => {
  const { resetPasswordAction, responseError } = props
  const [data, setData] = useState<any>({})
  const [errors, throwErrors] = useState<string>('')
  const [submited, submit] = useState(false)

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

    resetPasswordAction(data)
    submit(true)
  }

  return (
    <div className={styles.authForm + ' col s12 m5 push-m7'}>
      <div className={styles.header}>
        <img src={logo} alt="SmartHome" />
      </div>
      {!submited ? (
        <form
          className={styles.form + ' col s10 m8'}
          style={{ marginLeft: 0 }}
          onSubmit={handleSubmit}
        >
          <p className={styles.title}>Forgot Password</p>
          <div className={styles.restoreText}>
            <p>Place your email in the field below.</p>
            <p>We will send you a link with the</p>
            <p>instructions to follow.</p>
          </div>
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
      ) : (
        <p>Check your email</p>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  responseError: state.app.responseError,
})

const mapDispatchToProps = (dispatch) => ({
  resetPasswordAction: (data: object) => dispatch(resetPasswordAction(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RestoreForm)
