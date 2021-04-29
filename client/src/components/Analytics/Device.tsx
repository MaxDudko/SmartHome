import React from 'react'
import { Icon } from 'react-materialize'
import { connect } from 'react-redux'
import styles from '../Analytics/Analytics.module.scss'
import PieChart from './PieChart'

export interface DeviceProps {
  name: string
  value: string
  time: string
  energy: string
  difference: string
  icon: any
}

const Device: React.FC<DeviceProps> = (props) => {
  const { name, value, time, energy, difference, icon } = props

  return (
    <div className={`${styles.Device}`}>
      <div className={`${styles.header}`}>
        <p className={styles.title}>{name}</p>
        <select className={styles.selectPeriod}>
          <option value="day">This day</option>
          <option value="week">This week</option>
          <option value="month" selected={true}>
            This month
          </option>
          <option value="year">This year</option>
        </select>
      </div>
      <div className={styles.container}>
        <PieChart
          width={100}
          height={100}
          innerRadius={36}
          outerRadius={48}
          data={[{ name, value, color: '#1F8EFA' }, { value: 100 - +value }]}
          item={name}
          icon={icon}
        />
        <div className={`${styles.description}`}>
          <div className={styles.field}>
            <Icon>access_time</Icon>
            <span className={styles.value}>{time}</span>
            <span>({difference})</span>
          </div>
          <div className={styles.field}>
            <Icon>trending_up</Icon>
            <span className={styles.value}>{energy}</span>
            <span>({difference})</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Device)
