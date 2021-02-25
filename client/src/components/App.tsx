import React, { useEffect } from 'react'
import { Row } from 'react-materialize'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { appReadyAction } from '../actions/appActions'
import { saveDevicesAction } from '../actions/devicesActions'
import { selectHomeAction } from '../actions/homeActions'
import { tokenValidationAction } from '../actions/userActions'
import { DevicesState } from '../reducers/devicesReducer'
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
    const eventSource = new EventSource(`http://localhost:4000/stream?homeId=${homeId}`)

    if (homeId && userId) {
      eventSource.onmessage = (stream) => {
        saveDevicesAction(JSON.parse(stream.data))
      }
    } else {
      eventSource.close()
    }
  }, [homeId, saveDevicesAction, userId])

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
  selectHomeAction: (userId: string, homeId: string) => dispatch(selectHomeAction(userId, homeId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
