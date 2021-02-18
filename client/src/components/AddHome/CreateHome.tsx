import React, { useState } from 'react'
import { Button, Col, TextInput } from 'react-materialize'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { createHomeAction } from '../../actions/homeActions'
import styles from './AddHome.module.scss'

interface Props {
  userId: string
  createHomeAction: any
}

const CreateHome: React.FC<Props> = (props) => {
  const { createHomeAction, userId } = props
  const [data, setData] = useState<any>({})

  const handleSubmit = (event) => {
    event.preventDefault()

    const { userId, homeName, homeAddress, key } = data

    createHomeAction(userId.toString(), homeName, homeAddress, key)
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
})

const mapDispatchToProps = (dispatch) => ({
  createHomeAction: (userId: string, homeName: string, homeAddress: string, key: string) =>
    dispatch(createHomeAction(userId, homeName, homeAddress, key)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateHome)
