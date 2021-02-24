import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-materialize'
import { connect } from 'react-redux'
import { Redirect, Route, Switch, useHistory } from 'react-router'
import { useLocation } from 'react-router-dom'
import { appReadyAction } from '../actions/appActions'
import { saveDevicesAction } from '../actions/devicesActions'
import { selectHomeAction } from '../actions/homeActions'
import { tokenValidationAction } from '../actions/userActions'
import { DevicesState } from '../reducers/devicesReducer'
import SmartRouter from '../SmartRouter'
import AddDevice from './AddDevice/AddDevice'
import CreateHome from './AddHome/CreateHome'
import JoinHome from './AddHome/JoinHome'
import SelectHome from './AddHome/SelectHome'
import Analytics from './Analytics/Analytics'
import styles from './App.module.scss'
import LoginForm from './Authentication/LoginForm'
import RefreshForm from './Authentication/RefreshForm'
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
  modalOpen: boolean
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
    modalOpen,
  } = props
  const smartRouter = new SmartRouter()
  const location = useLocation()

  useEffect(() => {
    smartRouter.getPaths('dashboardRoutes')
  }, [userId, homeId])

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
              <Row className={styles.wrapper}>
                <div className="hide-on-med-and-down">
                  <Sidebar />
                </div>
                {homeId ? (
                  <>
                    {smartRouter.getRoutes('dashboardRoutes')}
                    {/*{smartRouter.getRedirects('dashboardRoutes', location.pathname, '/overview')}*/}
                    {smartRouter.getPaths('dashboardRoutes').includes(location.pathname) ? (
                      <Redirect to={location.pathname} />
                    ) : (
                      <Redirect to="/overview" />
                    )}
                    <DevicesSidebar />
                    {modalOpen && <AddDevice />}
                  </>
                ) : (
                  <>
                    {smartRouter.getRoutes('homeRoutes')}

                    {smartRouter.getPaths('homeRoutes').includes(location.pathname) ? (
                      <Redirect to={location.pathname} />
                    ) : (
                      <Redirect to="/select-home" />
                    )}
                  </>
                )}
              </Row>
            </>
          ) : (
            <>
              {smartRouter.getRoutes('authRoutes')}

              <WelcomeScreen />
              {smartRouter.getPaths('authRoutes').includes(location.pathname) ? (
                <Redirect to={`${location.pathname}${location.search}`} />
              ) : (
                <Redirect to="/login" />
              )}
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
  modalOpen: state.app.modalOpen,
})

const mapDispatchToProps = (dispatch) => ({
  appReadyAction: () => dispatch(appReadyAction()),
  tokenValidationAction: (token: string) => dispatch(tokenValidationAction(token)),
  saveDevicesAction: (data: DevicesState) => dispatch(saveDevicesAction(data)),
  selectHomeAction: (userId: string, homeId: string) => dispatch(selectHomeAction(userId, homeId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
