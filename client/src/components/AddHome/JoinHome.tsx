import React, { useEffect, useState } from 'react'
import { Button, Col, TextInput } from 'react-materialize'
import { connect } from 'react-redux'
import { joinHomeAction } from '../../actions/homeActions'
import styles from './AddHome.module.scss'

interface Props {
  joinHomeAction: any
  userId: string
  responseError: string
}

const JoinHome: React.FC<Props> = (props) => {
  const { joinHomeAction, userId, responseError } = props
  const [data, setData] = useState<any>({})
  const [errors, throwErrors] = useState<string>('')

  useEffect(() => {
    throwErrors(responseError)
  }, [responseError])

  const handleSubmit = (event) => {
    event.preventDefault()

    const { homeId, key } = data

    joinHomeAction(homeId.toString(), key)
  }

  return (
    <Col s={12} l={6} className={styles.homeForm}>
      <p className={styles.title}>Join Home</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextInput
          id="homeId"
          type="text"
          inputClassName="validate"
          required={true}
          label="Home ID"
          placeholder=""
          onChange={(e) => {
            setData({
              ...data,
              homeId: e.target.value,
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
          Join
        </Button>
      </form>
    </Col>
  )
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  responseError: state.app.responseError,
})

const mapDispatchToProps = (dispatch) => ({
  joinHomeAction: (homeId: string, key: string) => dispatch(joinHomeAction(homeId, key)),
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinHome)
