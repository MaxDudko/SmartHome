import React from 'react'
import { Button, Col, TextInput } from 'react-materialize'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './AddHome.module.scss'

interface Props {
  handleSubmit: any
  setData: Function
  data: any
  userId: string
}

const JoinHome: React.FC<Props> = (props) => {
  const { handleSubmit, setData, data, userId } = props
  return (
    <Col s={12} l={6}>
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
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(JoinHome)
