import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-materialize'
import { connect } from 'react-redux'
import { Redirect, Route, Switch, useHistory } from 'react-router'
import { appReadyAction } from '../actions/appActions'
import { saveDevicesAction } from '../actions/devicesActions'
import { selectHomeAction } from '../actions/homeActions'
import { tokenValidationAction } from '../actions/userActions'
import AddDevice from './AddDevice/AddDevice'
import CreateHome from './AddHome/CreateHome'
import JoinHome from './AddHome/JoinHome'
import SelectHome from './AddHome/SelectHome'
import Analytics from './Analytics/Analytics'
import styles from './App.module.scss'
import LoginForm from './Authentication/LoginForm'
import RegisterForm from './Authentication/RegisterForm'
import RestoreForm from './Authentication/RestoreForm'
import WelcomeScreen from './Authentication/WelcomeScreen'
import Devices from './Devices/Devices'
import DevicesSidebar from './DevicesSidebar/DevicesSidebar'
import Gallery from './Gallery/Gallery'
import History from './History/History'
import Overview from './Overview/Overview'
import Rules from './Rules/Rules'
import Settings from './Settings/Settings'
import Sidebar from './Sidebar/Sidebar'
import Navbar from './TopNavbar/TopNavbar'

interface Props {
  isReady: boolean
  homeId: string
  userId: string
  addDeviceModalOpen: boolean
  tokenValidationAction: Function
  selectHomeAction: Function
  saveDevicesAction: Function
  appReadyAction: Function
}

const App: React.FC<Props> = (props) => {
  const {
    isReady,
    appReadyAction,
    tokenValidationAction,
    homeId,
    userId,
    saveDevicesAction,
    addDeviceModalOpen,
  } = props

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:4000/stream?homeId=${homeId}`)

    if (homeId && userId) {
      eventSource.onmessage = (stream) => {
        saveDevicesAction(JSON.parse(stream.data))
      }
    } else {
      eventSource.close()
    }
  }, [homeId, userId])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      tokenValidationAction(token)
    } else {
      appReadyAction()
    }
  })

  return (
    <Row className={styles.App}>
      {isReady && (
        <>
          {userId ? (
            <>
              <Navbar />
              <div className="row">
                <div className="hide-on-med-and-down">
                  <Sidebar />
                </div>
                {homeId ? (
                  <>
                    <Switch>
                      <Route path="/overview" component={Overview} />
                      <Route path="/devices" component={Devices} />
                      <Route path="/analytics" component={Analytics} />
                      <Route path="/rules" component={Rules} />
                      <Route path="/gallery" component={Gallery} />
                      <Route path="/history" component={History} />
                      <Route path="/settings" component={Settings} />
                    </Switch>

                    <Redirect to="/overview" />
                    <DevicesSidebar />
                    {addDeviceModalOpen && <AddDevice />}
                  </>
                ) : (
                  <>
                    <Switch>
                      <Route path="/select-home" component={SelectHome} />
                      <Route path="/create-home" component={CreateHome} />
                      <Route path="/join-home" component={JoinHome} />
                    </Switch>

                    <Redirect to="/select-home" />
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <Switch>
                <Route path="/login" component={LoginForm} />
                <Route path="/register" component={RegisterForm} />
                <Route path="/restore" component={RestoreForm} />
              </Switch>

              <WelcomeScreen />
              <Redirect to="/login" />
            </>
          )}
        </>
      )}
    </Row>
  )
}

const mapStateToProps = (state) => ({
  isReady: state.app.isReady,
  homeId: state.home.id,
  userId: state.user.id,
  addDeviceModalOpen: state.app.addDeviceModalOpen,
})

const mapDispatchToProps = (dispatch) => ({
  appReadyAction: () => dispatch(appReadyAction()),
  tokenValidationAction: (token) => dispatch(tokenValidationAction(token)),
  saveDevicesAction: (data) => dispatch(saveDevicesAction(data)),
  selectHomeAction: (userId, homeId) => dispatch(selectHomeAction(userId, homeId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
