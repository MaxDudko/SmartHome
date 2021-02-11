import React from 'react'
import { Button, TextInput } from 'react-materialize'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import styles from './Authentication.module.scss'

interface Props {
  handleSubmit: any
  handleChange: any
  errors: any
}

const Gallery: React.FC<Props> = (props) => {
  const { handleSubmit, handleChange, errors } = props
  return (
    <form className={styles.form + ' col s10 m8'} style={{ marginLeft: 0 }} onSubmit={handleSubmit}>
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
      <div className={styles.links}>
        <span className="col s12" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          By clicking Join now, you agree to the LinkedIn User Agreement, Privacy Policy. and Cookie
          Policy.
        </span>
        <span>
          Already have an account?
          <Link to="/login">
            <span className={styles.link}>Login</span>
          </Link>
        </span>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
