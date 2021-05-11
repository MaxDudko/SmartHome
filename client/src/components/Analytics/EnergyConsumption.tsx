import React, { useState } from 'react'
import { Button, Col } from 'react-materialize'
import { connect } from 'react-redux'
import data from '../../testData'
import styles from '../Analytics/Analytics.module.scss'
import LineChart from './LineChart'
import PieChart from './PieChart'

const EnergyConsumption: React.FC = (props) => {
  const rangeOptions = ['day', 'week', 'month', 'year']
  const [range, setRange] = useState('year')

  return (
    <div className={styles.energyConsumption}>
      <div className={`row ${styles.rowContainer}`}>
        <Col s={12} l={3} className={styles.pieCharts}>
          <div className={styles.title}>
            <p className="left">Energy Consumption</p>
          </div>
          <div className={styles.container}>
            {data.rooms.map((el: any, i: number) => (
              <div className={`${styles.item}`} key={i}>
                <div className={styles.chartContainer}>
                  <PieChart
                    data={data.rooms}
                    item={el.name}
                    width={72}
                    height={72}
                    innerRadius={26}
                    outerRadius={35}
                  />
                </div>
                <div className={styles.description}>
                  <p>{el.name}</p>
                  <p>{el.km} KM</p>
                </div>
              </div>
            ))}
          </div>
        </Col>
        <Col s={12} l={9} className={styles.chartContainer}>
          <div className={styles.rangBar}>
            {rangeOptions.map((el: string, i: number) => (
              <Button
                node="button"
                type="submit"
                name={el}
                key={i}
                className={`waves-effect btn btn-small ${range === el ? 'blue' : 'transparent'}`}
                style={range !== el ? { boxShadow: 'none', color: '#657d95' } : {}}
                onClick={() => setRange(el)}
              >
                {el.charAt(0).toUpperCase() + el.slice(1)}
              </Button>
            ))}
          </div>
          <div>
            <LineChart
              width={1200}
              height={370}
              data={data.rooms.map((d) => [...d.points])}
              colors={data.rooms.map((d) => d.color)}
              range={range}
            />
          </div>
        </Col>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(EnergyConsumption)
