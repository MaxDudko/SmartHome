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

const Gallery: React.FC<Props> = (props) => {
  const { handleSubmit, handleChange } = props
  return (
    <form className={styles.form + ' col s10 m8'} style={{ marginLeft: 0 }} onSubmit={handleSubmit}>
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
      <Button
        node="button"
        type="submit"
        className="waves-effect btn col s12"
        style={{ backgroundColor: '#1f8efa', marginLeft: '20px' }}
      >
        RECOVER PASSWORD
      </Button>
    </form>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
