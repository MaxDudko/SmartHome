import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Icon, Row, Select, Table, TextInput } from 'react-materialize/'
import { connect } from 'react-redux'
import {
  createHomeAction,
  getHomeListAction,
  joinHomeAction,
  selectHomeAction,
} from '../../actions/homeActions'
import styles from './AddHome.module.scss'

interface Props {
  userId: string
  homeList: any
  getHomeListAction: Function
  selectHomeAction: Function
  createHomeAction: Function
  joinHomeAction: Function
}

const AddHome: React.FC<Props> = (props) => {
  const {
    userId,
    getHomeListAction,
    homeList,
    selectHomeAction,
    createHomeAction,
    joinHomeAction,
  } = props
  const items = ['Home List', 'Create Home', 'Join Home']
  const [currentForm, setForm] = useState('Home List')
  const [data, setData] = useState<any>({})

  useEffect(() => {
    userId && getHomeListAction(userId.toString())
  }, [userId])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (currentForm === 'Home List') {
      const { userId, homeId } = data
      return selectHomeAction(userId.toString(), homeId.toString())
    }

    if (currentForm === 'Create Home') {
      const { userId, homeName, homeAddress, key } = data
      return createHomeAction(userId.toString(), homeName, homeAddress, key)
    }

    if (currentForm === 'Join Home') {
      const { userId, homeId, key } = data
      return joinHomeAction(userId.toString(), homeId.toString(), key)
    }
  }

  const homeTable = (
    <div>
      <p className={styles.title}>Select Home</p>
      {homeList.length ? (
        <Table>
          <thead>
            <tr>
              <td />
              <td>ID</td>
              <td>Name</td>
              <td>Address</td>
              <td>Role</td>
              <td />
            </tr>
          </thead>
          <tbody>
            {homeList.map((home, i) => (
              <tr key={i}>
                <td>
                  <Icon>home</Icon>
                </td>
                <td>{home.id}</td>
                <td>{home.name}</td>
                <td>{home.address}</td>
                <td>{home.role}</td>
                <td>
                  <form onSubmit={handleSubmit}>
                    <Button
                      node="button"
                      type="submit"
                      onClick={() => {
                        setData({
                          ...data,
                          userId,
                          homeId: home.id,
                        })
                      }}
                    >
                      Select
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className={styles.error}>
          No one Home not found, please create new Home or join to existing
        </p>
      )}
    </div>
  )

  const createHome = (
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

  const joinHome = (
    <Col s={12} l={6}>
      <p className={styles.title}>Join Home</p>
      <form onSubmit={handleSubmit}>
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

  return (
    <Row className={styles.AddHome}>
      <Col s={12} l={2}>
        <ul className={styles.menu}>
          {items.map((item, i) => (
            <li
              className={styles.item + ` ${item === currentForm && styles.active}`}
              key={i}
              onClick={() => setForm(item)}
            >
              <span className={styles.title}>{item}</span>
            </li>
          ))}
        </ul>
      </Col>
      <Col s={12} l={10}>
        {(currentForm === 'Home List' && homeTable) ||
          (currentForm === 'Create Home' && createHome) ||
          (currentForm === 'Join Home' && joinHome)}
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  homeList: state.user.homeList,
})

const mapDispatchToProps = (dispatch) => ({
  getHomeListAction: (userId) => dispatch(getHomeListAction(userId)),
  selectHomeAction: (userId, homeId) => dispatch(selectHomeAction(userId, homeId)),
  createHomeAction: (userId, homeName, homeAddress, key) =>
    dispatch(createHomeAction(userId, homeName, homeAddress, key)),
  joinHomeAction: (userId, homeId, key) => dispatch(joinHomeAction(userId, homeId, key)),
})
export default connect(mapStateToProps, mapDispatchToProps)(AddHome)
