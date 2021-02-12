import React, { useEffect, useState } from 'react'
import { Container } from 'react-materialize'
import { connect } from 'react-redux'
import { Redirect, Route, Switch, useHistory } from 'react-router'
import { selectHomeAction } from '../../actions/homeActions'
import AddDevice from '../AddDevice/AddDevice'
import AddHome from '../AddHome/AddHome'
import CreateHome from '../AddHome/CreateHome'
import JoinHome from '../AddHome/JoinHome'
import SelectHome from '../AddHome/SelectHome'
import Analytics from '../Analytics/Analytics'
import Devices from '../Devices/Devices'
import DevicesSidebar from '../DevicesSidebar/DevicesSidebar'
import Gallery from '../Gallery/Gallery'
import History from '../History/History'
import Overview from '../Overview/Overview'
import Rules from '../Rules/Rules'
import Settings from '../Settings/Settings'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../TopNavbar/TopNavbar'
import styles from './Dashboard.module.scss'

interface Props {
  currentPage: string
  addDeviceModalOpen: boolean
  homeId: string
  userId: string
  selectHomeAction: Function
}
const Dashboard: React.FC<Props> = (props) => {
  const { currentPage, addDeviceModalOpen, userId, homeId, selectHomeAction } = props
  const history = useHistory()

  useEffect(() => {
    const homeId = localStorage.getItem('homeId')
    if (userId && homeId) {
      selectHomeAction(userId.toString(), homeId)
      // history.push('/dashboard/overview')
    }
  }, [userId])

  // useEffect(() => {
  //   if (!homeId) {
  //     history.push('/dashboard/home/select-home')
  //   }
  // }, [homeId])

  return (
    <div className={styles.Dashboard}>
      <Navbar />
      <div className="row">
        {localStorage.getItem('homeId') ? (
          <>
            <div className="row">
              <div className="hide-on-med-and-down">
                <Sidebar />
              </div>
              <Switch>
                <Route path="/overview" component={Overview} />
                <Route path="/devices" component={Devices} />
                <Route path="/analytics" component={Analytics} />
                <Route path="/rules" component={Rules} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/history" component={History} />
                <Route path="/settings" component={Settings} />
              </Switch>
            </div>
            <DevicesSidebar />
            {addDeviceModalOpen && <AddDevice />}
            <Redirect to="/overview" />
          </>
        ) : (
          <>
            <AddHome />
            <Redirect to="/select-home" />
          </>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  addDeviceModalOpen: state.app.addDeviceModalOpen,
  currentPage: state.app.currentPage,
  homeId: state.home.id,
  userId: state.user.id,
})

const mapDispatchToProps = (dispatch) => ({
  selectHomeAction: (userId, homeId) => dispatch(selectHomeAction(userId, homeId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
