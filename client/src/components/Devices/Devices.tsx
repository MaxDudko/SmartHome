import { DateTime } from 'luxon'
import React from 'react'
import { Icon, Table } from 'react-materialize'
import { connect } from 'react-redux'
import { openModalAction } from '../../actions/appActions'
import { lockToggleAction } from '../../actions/devicesActions'
import styles from './Devices.module.scss'

interface Props {
  homeId: string
  devices: any
  openModalAction: Function
  lockToggleAction: Function
}

const Devices: React.FC<Props> = (props) => {
  const { homeId, openModalAction, devices, lockToggleAction } = props

  const formatDate = (date: string) => {
    const newDate = DateTime.fromISO(date)
    return newDate.setLocale('en-gb').toLocaleString()
  }

  const batteryIndicator = (value: number) => {
    const icon =
      (value > 50 && 'battery_charging_full') || (value <= 50 && 'battery_alert') || 'battery_std'
    const color = (value > 50 && '#05c985') || (value <= 50 && '#ffab4f') || '#1f8efa'
    return <Icon style={{ color }}>{icon}</Icon>
  }

  return (
    <div className={styles.Devices + ' col s12 l9'}>
      <h4>Devices</h4>
      <Icon className={styles.add} onClick={openModalAction}>
        add_circle
      </Icon>
      <div className={styles.wrapper}>
        <Table>
          <thead>
            <tr>
              <th>Device</th>
              <th>Name</th>
              <th>Location</th>
              <th>Status</th>
              <th>Battery</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {Object.entries(devices).map((deviceType: any, i) =>
              deviceType[1].map((device: any, i) => (
                <tr key={i}>
                  <td>
                    <Icon className={styles.device}>{device.type}</Icon>
                  </td>
                  <td>{device.type}</td>
                  <td>{device.location}</td>
                  <td>
                    <div className="switch">
                      <label>
                        <input
                          type="checkbox"
                          checked={device.value}
                          onChange={() => lockToggleAction(homeId.toString())}
                        />
                        <span className="lever" />
                      </label>
                    </div>
                  </td>
                  <td>
                    <span className={styles.battery}>{batteryIndicator(device.battery)}</span>
                  </td>
                  <td>{formatDate(device.updatedAt)}</td>
                  <td>
                    <Icon>more_vert</Icon>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  homeId: state.home.id,
  devices: state.devices,
})
const mapDispatchToProps = (dispatch) => ({
  openModalAction: () => dispatch(openModalAction()),
  lockToggleAction: (homeId: string) => dispatch(lockToggleAction(homeId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Devices)
