import React from 'react'
import { Button, TextInput } from 'react-materialize'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import styles from './Authentication.module.scss'

interface Props {
  handleSubmit: any
  handleChange: any
}

const LoginForm: React.FC<Props> = (props) => {
  const { handleSubmit, handleChange } = props

  return (
    <form className={styles.form + ' col s10 m8'} style={{ marginLeft: 0 }} onSubmit={handleSubmit}>
      <p className={styles.title}>Sign in</p>
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
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
