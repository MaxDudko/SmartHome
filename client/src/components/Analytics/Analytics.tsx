import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Icon } from 'react-materialize'
import { connect } from 'react-redux'
import styles from '../Analytics/Analytics.module.scss'

interface Props {}

const Analytics: React.FC<Props> = (props) => {
  const data = {
    datasets: [
      {
        data: [13, 87],
        backgroundColor: ['#05c985', '#3e4e6c'],
        borderWidth: 0,
        cutoutPercentage: 1,
      },
    ],
  }
  return (
    <div className={`${styles.Analytics} col s12 l9`}>
      <h4>Analytics</h4>
      <div className={`${styles.row} ${styles.bg}`}>
        <div className={styles.row}>
          <div>
            <p className={styles.title}>Energy Consumption</p>
          </div>
          <div>
            <span className={styles.btn}>DAY</span>
            <span className={styles.btn}>WEEK</span>
            <span className={styles.btn}>MONTH</span>
            <span className={styles.btn}>YEAR</span>
          </div>
        </div>
        <div className={`${styles.leftChart} col s3`}>
          <div className={styles.row}>
            <div className={styles.chartContainer}>
              <Doughnut data={data} options={{ cutoutPercentage: 80 }} />
            </div>
            <div>
              <p className={styles.room}>[Living Room]</p>
              <p className={styles.value}>[1034 KM]</p>
            </div>
          </div>
        </div>
        <div className={`${styles.rightChart} col s9`}>[CHART...]</div>
      </div>
      <div className={styles.row}>
        <div className={`${styles.deviceContainer} ${styles.bg}`}>
          <div className={styles.row}>
            <p className={styles.title}>[Camera]</p>
            <select name="range" id="range">
              <option value="month">This day</option>
              <option value="month" defaultChecked={true}>
                This week
              </option>
              <option value="month">This month</option>
              <option value="month">This year</option>
            </select>
          </div>
          <div className={styles.row}>
            <div className={styles.chartContainer}>
              <Icon>camera_alt</Icon>
            </div>
            <div>
              <div className={styles.row}>
                <Icon>access_time</Icon>
                <span>[57:03:24]</span>
                <span>[(-24%)]</span>
              </div>
              <div className={styles.row}>
                <Icon>show_chart</Icon>
                <span>[320 Wh]</span>
                <span>[(-24%)]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.room}>
          <div>
            <div className={styles.row}>
              <span>[174]</span>
              <span>
                KWH
                <Icon>info</Icon>
              </span>
            </div>
            <div className={styles.row}>[Living Room]</div>
          </div>
          <div className={styles.chartContainer}>[Chart...]</div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Analytics)
