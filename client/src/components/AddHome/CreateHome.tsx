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

const CreateHome: React.FC<Props> = (props) => {
  const { handleSubmit, setData, data, userId } = props

  return (
    <Col s={12} l={6}>
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
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CreateHome)
