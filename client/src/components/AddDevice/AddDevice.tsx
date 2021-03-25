import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Col, Icon, Table } from 'react-materialize'
import { connect } from 'react-redux'
import { openModalAction } from '../../actions/appActions'
import { addDevicesAction, getSupportedDevicesAction } from '../../actions/devicesActions'
import styles from './AddDevice.module.scss'

interface Props {
  homeId: string
  devices: any
  openModalAction: Function
  getSupportedDevicesAction: Function
  addDevicesAction: Function
}

const AddDevice: React.FC<Props> = (props) => {
  const { homeId, devices, openModalAction, getSupportedDevicesAction, addDevicesAction } = props
  const [devicesList, setDevice] = useState<any>([])

  const handleChange = (id: string) => {
    const idsSet = new Set(devicesList)
    if (idsSet.has(id)) {
      idsSet.delete(id)
    } else {
      idsSet.add(id)
    }

    setDevice(Array.from(idsSet))
  }

  const handleSubmit = () => {
    addDevicesAction(devicesList, homeId)
    openModalAction()
  }

  useEffect(() => {
    getSupportedDevicesAction(homeId)
  }, [homeId])

  return (
    <div className={styles.AddDevice}>
      <Col className={styles.modal}>
        <div className={styles.header}>
          <p className={styles.title}>Add a new device</p>
          <Icon className={styles.cancel} onClick={() => openModalAction()}>
            cancel
          </Icon>
        </div>
        <Table>
          <thead>
            <tr>
              <th />
              <th>Device</th>
              <th>Name</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device: any, i) => (
              <tr key={i}>
                <td>
                  <Checkbox
                    id={device.deviceId}
                    label=""
                    value={device.deviceId}
                    onChange={() => handleChange(device.deviceId)}
                  />
                </td>
                <td>
                  <Icon className={styles.device}>{device.type}</Icon>
                </td>
                <td>{device.type.charAt(0).toUpperCase() + device.type.slice(1)}</td>
                <td>{device.location}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className={styles.footer}>
          <Button className={styles.secondary} onClick={() => openModalAction()}>
            Cancel
          </Button>
          <Button className={styles.primary} onClick={() => handleSubmit()}>
            Continue
          </Button>
        </div>
      </Col>
    </div>
  )
}

const mapStateToProps = (state) => ({
  homeId: state.home.id,
  devices: state.devices.supportedDevices,
})
const mapDispatchToProps = (dispatch) => ({
  openModalAction: () => dispatch(openModalAction()),
  getSupportedDevicesAction: (homeId: string) => dispatch(getSupportedDevicesAction(homeId)),
  addDevicesAction: (devices: any, homeId: string) => dispatch(addDevicesAction(devices, homeId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddDevice)
