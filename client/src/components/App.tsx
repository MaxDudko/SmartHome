import React, { useEffect } from 'react'
import { Row } from 'react-materialize'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { appReadyAction } from '../actions/appActions'
import { saveDevicesAction } from '../actions/devicesActions'
import { saveHomeAction, selectHomeAction } from '../actions/homeActions'
import { tokenValidationAction } from '../actions/userActions'
import { DevicesState } from '../reducers/devicesReducer'
import { HomeState } from '../reducers/homeReducer'
import SmartRouter from '../SmartRouter'
import AddDevice from './AddDevice/AddDevice'
import styles from './App.module.scss'
import WelcomeScreen from './Authentication/WelcomeScreen'
import DevicesSidebar from './DevicesSidebar/DevicesSidebar'
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
  saveHomeAction: Function
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
    saveHomeAction,
    modalOpen,
  } = props
  const smartRouter = new SmartRouter()
  const location = useLocation()

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_API_URL}/api/v1/stream?homeId=${homeId}`
    )

    if (userId) {
      eventSource.onmessage = (stream: any) => {
        const { event, data } = JSON.parse(stream.data)
        switch (event) {
          case 'devices':
            return saveDevicesAction(data)
          case 'home':
            localStorage.setItem('homeId', data.id)
            return saveHomeAction(data)
        }
      }
    } else {
      eventSource.close()
    }
  }, [homeId])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      tokenValidationAction(token)
    } else {
      appReadyAction()
    }
  }, [appReadyAction, tokenValidationAction])

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
                    {smartRouter.getRedirects('dashboardRoutes', '/overview', location.pathname)}
                    <DevicesSidebar />
                    {modalOpen && <AddDevice />}
                  </>
                ) : (
                  <>
                    {smartRouter.getRoutes('homeRoutes')}
                    {smartRouter.getRedirects('homeRoutes', '/select-home', location.pathname)}
                  </>
                )}
              </Row>
            </>
          ) : (
            <>
              {smartRouter.getRoutes('authRoutes')}
              {smartRouter.getRedirects('authRoutes', '/login', location.pathname, location.search)}
              <WelcomeScreen />
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
  saveHomeAction: (data: HomeState) => dispatch(saveHomeAction(data)),
  selectHomeAction: (userId: string, homeId: string) => dispatch(selectHomeAction(userId, homeId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
