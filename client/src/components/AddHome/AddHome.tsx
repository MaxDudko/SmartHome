import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Icon, Row, Select, Table, TextInput } from 'react-materialize/'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router'
import { Link, useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import {
  createHomeAction,
  getHomeListAction,
  joinHomeAction,
  selectHomeAction,
} from '../../actions/homeActions'
import styles from './AddHome.module.scss'
import CreateHome from './CreateHome'
import JoinHome from './JoinHome'
import SelectHome from './SelectHome'

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
  const [data, setData] = useState<any>({})
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    userId && getHomeListAction(userId.toString())
  }, [userId])

  const handleSubmit = (event) => {
    event.preventDefault()

    const { userId, homeId, homeName, homeAddress, key } = data

    if (location.pathname === '/select-home') {
      selectHomeAction(userId.toString(), homeId.toString())
    }

    if (location.pathname === '/create-home') {
      createHomeAction(userId.toString(), homeName, homeAddress, key)
    }

    if (location.pathname === '/join-home') {
      joinHomeAction(userId.toString(), homeId.toString(), key)
    }
  }

  return (
    <Row className={styles.AddHome}>
      <Col s={12} l={2}>
        <ul className={styles.menu}>
          <li
            className={
              styles.item +
              ` ${location.pathname === '/select-home' && styles.active}`
            }
          >
            <Link to="/select-home">
              <span className={styles.title}>Select Home</span>
            </Link>
          </li>
          <li
            className={
              styles.item +
              ` ${location.pathname === '/create-home' && styles.active}`
            }
          >
            <Link to="/create-home">
              <span className={styles.title}>Create Home</span>
            </Link>
          </li>
          <li
            className={
              styles.item + ` ${location.pathname === '/join-home' && styles.active}`
            }
          >
            <Link to="/join-home">
              <span className={styles.title}>Join Home</span>
            </Link>
          </li>
        </ul>
      </Col>
      <Col s={12} l={10}>
        <Route
          path="/select-home"
          render={() => (
            <SelectHome
              homeList={homeList}
              handleSubmit={handleSubmit}
              setData={setData}
              data={data}
              userId={userId}
            />
          )}
        />
        <Route
          path="/create-home"
          render={() => (
            <CreateHome handleSubmit={handleSubmit} setData={setData} data={data} userId={userId} />
          )}
        />
        <Route
          path="/join-home"
          render={() => (
            <JoinHome handleSubmit={handleSubmit} setData={setData} data={data} userId={userId} />
          )}
        />
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
