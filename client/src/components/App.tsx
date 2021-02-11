import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch, useHistory } from 'react-router'
import { saveDevicesAction } from '../actions/devicesActions'
import { tokenValidationAction } from '../actions/userActions'
import styles from './App.module.scss'
import Authentication from './Authentication/Authentication'
import Dashboard from './Dashboard/Dashboard'

interface Props {
  homeId: string
  userId: string
  tokenValidationAction: Function
  saveDevicesAction: Function
}

const App: React.FC<Props> = (props) => {
  const { tokenValidationAction, homeId, userId, saveDevicesAction } = props
  const history = useHistory()

  useEffect(() => {
    if (!homeId) {
      return
    }
    const eventSource = new EventSource(`http://localhost:4000/stream?homeId=${homeId}`)
    eventSource.onopen = () => {
      console.log('connection to stream has been opened')
    }
    eventSource.onerror = (error) => {
      console.log('An error has occurred while receiving stream', error)
    }
    eventSource.onmessage = (stream) => {
      console.log('received stream', JSON.parse(stream.data))
      saveDevicesAction(JSON.parse(stream.data))
    }
  }, [homeId])

  useEffect(() => {
    const token = localStorage.getItem('token')
    tokenValidationAction(token)
  }, [])

  useEffect(() => {
    if (userId) {
      history.push('/dashboard/overview')
    } else {
      history.push('/auth/login')
    }
  }, [userId])

  return (
    <div className={styles.App}>
      <Route path="/auth" component={Authentication} />
      <Route path="/dashboard" component={Dashboard} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  homeId: state.home.id,
  userId: state.user.id,
})

const mapDispatchToProps = (dispatch) => ({
  tokenValidationAction: (token) => dispatch(tokenValidationAction(token)),
  saveDevicesAction: (data) => dispatch(saveDevicesAction(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
