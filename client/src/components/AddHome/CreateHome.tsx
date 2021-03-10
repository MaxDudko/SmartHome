import React, { useEffect, useState } from 'react'
import { Button, Col, TextInput } from 'react-materialize'
import { connect } from 'react-redux'
import {authModalAction} from "../../actions/appActions";
import { createHomeAction } from '../../actions/homeActions'
import validate from '../../validatin'
import styles from './AddHome.module.scss'

interface Props {
  userId: string
  authModal: string
  createHomeAction: any
  responseError: string
  authModalAction: Function
}

const CreateHome: React.FC<Props> = (props) => {
  const { createHomeAction, userId, responseError, authModal, authModalAction } = props
  const [data, setData] = useState<any>({})
  const [errors, throwErrors] = useState<string>('')

  useEffect(() => {
    throwErrors(responseError)
  }, [responseError])

  useEffect(() => {
    if (authModal) {
      window.open(authModal)
      authModalAction('')
    }
  }, [authModal])

  const handleSubmit = (event) => {
    event.preventDefault()

    const isValid = validate(data, throwErrors)
    if (isValid) {
      const { userId, homeName, homeAddress, key } = data
      createHomeAction(userId.toString(), homeName, homeAddress, key)
    }
  }

  return (
    <Col s={12} l={6} className={styles.homeForm}>
      <p className={styles.title}>Create Home</p>
      <form onSubmit={handleSubmit}>
        <TextInput
          id="name"
          type="text"
          inputClassName="validate"
          required={true}
          label="Home Name"
          placeholder=""
          onChange={(e) => {
            setData({
              ...data,
              homeName: e.target.value,
            })
          }}
        />
        <TextInput
          id="address"
          type="text"
          inputClassName="validate"
          required={true}
          label="Home Address"
          placeholder=""
          onChange={(e) => {
            setData({
              ...data,
              homeAddress: e.target.value,
            })
          }}
        />
        <TextInput
          id="key"
          type="password"
          inputClassName="validate"
          required={true}
          label="Security Key"
          placeholder=""
          onChange={(e) => {
            setData({
              ...data,
              key: e.target.value,
            })
          }}
        />
        <span style={{ color: 'red', fontSize: '12px' }}>{errors}</span>
        <Button
          node="button"
          type="submit"
          onClick={() => {
            setData({
              ...data,
              userId,
            })
          }}
        >
          Create
        </Button>
      </form>
    </Col>
  )
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  responseError: state.app.id,
  authModal: state.app.authModal,
})

const mapDispatchToProps = (dispatch) => ({
  createHomeAction: (userId: string, homeName: string, homeAddress: string, key: string) =>
    dispatch(createHomeAction(userId, homeName, homeAddress, key)),
  authModalAction: (url: string) => dispatch(authModalAction(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateHome)
