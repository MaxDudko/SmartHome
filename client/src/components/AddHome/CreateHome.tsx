import React, { useEffect, useState } from 'react'
import { Button, Col, TextInput } from 'react-materialize'
import { connect } from 'react-redux'
import { createHomeAction } from '../../actions/homeActions'
import styles from './AddHome.module.scss'

interface Props {
  userId: string
  createHomeAction: any
  responseError: string
}

const CreateHome: React.FC<Props> = (props) => {
  const { createHomeAction, userId, responseError } = props
  const [data, setData] = useState<any>({})
  const [errors, throwErrors] = useState<string>('')

  useEffect(() => {
    throwErrors(responseError)
  }, [responseError])

  const validateData = (data) => {
    const { homeName, homeAddress, key } = data

    if (!homeName.match(/^[A-Za-z_][A-Za-z0-9_]{3,32}$/)) {
      throwErrors('Home name not valid')
      return false
    }

    if (!homeAddress.match(/^[A-Za-z_][A-Za-z0-9_]{3,32}$/)) {
      throwErrors('Home address not valid')
      return false
    }

    if (!key.match(/^(?=.*[A-Za-z0-9])(?=.*\d)[A-Za-z0-9\d]{8,32}$/)) {
      throwErrors('Security key must be at least 8-64 A-Z, a-z, 0-9')
      return false
    }

    return true
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const isValid = validateData(data)
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
})

const mapDispatchToProps = (dispatch) => ({
  createHomeAction: (userId: string, homeName: string, homeAddress: string, key: string) =>
    dispatch(createHomeAction(userId, homeName, homeAddress, key)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateHome)
