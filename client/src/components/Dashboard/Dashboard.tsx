import React, { useEffect, useState } from 'react'
import { Container } from 'react-materialize'
import { connect } from 'react-redux'
import { getDevicesAction } from '../../actions/devicesActions'
import {
  createHomeAction,
  getHomeListAction,
  joinHomeAction,
  selectHomeAction,
} from '../../actions/homeActions'
import AddDevice from '../AddDevice/AddDevice'
import AddHome from '../AddHome/AddHome'
import Devices from '../Devices/Devices'
import DevicesSidebar from '../DevicesSidebar/DevicesSidebar'
import Overview from '../Overview/Overview'
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
  const {
    currentPage,
    addDeviceModalOpen,
    userId,
    selectHomeAction,
  } = props

  useEffect(() => {
    const home_id = localStorage.getItem('homeId')
    if (userId && home_id) {
      selectHomeAction(userId.toString(), home_id)
    }
  }, [userId])
  const router = {
    devices: <Devices />,
    overview: <Overview />,
  }
  return (
    <div className={styles.Dashboard}>
      <Navbar />
      {localStorage.getItem('homeId') ? (
        <>
          <div className="row">
            <div className="hide-on-med-and-down">
              <Sidebar />
            </div>
            {router[currentPage] || <div>{currentPage}</div>}
          </div>
          <DevicesSidebar />
          {addDeviceModalOpen && <AddDevice />}
        </>
      ) : (
        <AddHome />
      )}
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
