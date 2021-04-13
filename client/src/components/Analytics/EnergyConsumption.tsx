import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-materialize'
import { connect } from 'react-redux'
import data from '../../testData'
import styles from '../Analytics/Analytics.module.scss'
import LinerChart from './LinerChart'
import PieChart from './PieChart'

interface Props {}

const EnergyConsumption: React.FC<Props> = (props) => {
  const rangeOptions = ['day', 'week', 'month', 'year']
  const [range, setRange] = useState('year')

  return (
    <div className={styles.energyConsumption}>
      <Row className={styles.header}>
        <Col s={9}>
          <p className={`left ${styles.title}`}>Energy Consumption</p>
        </Col>
        <Col s={3} className={styles.rangBar}>
          {rangeOptions.map((el: string, i: number) => (
            <Button
              node="button"
              type="submit"
              name={el}
              key={i}
              className={`waves-effect btn ${range === el ? 'blue' : 'transparent'}`}
              style={range !== el ? { boxShadow: 'none', color: '#657d95' } : {}}
              onClick={() => setRange(el)}
            >
              {el.charAt(0).toUpperCase() + el.slice(1)}
            </Button>
          ))}
        </Col>
      </Row>
      <Row>
        <Col s={3} className={styles.pieCharts}>
          {data.rooms.map((el: any, i: number) => (
            <div className={styles.item} key={i}>
              <div className={styles.chartContainer}>
                <PieChart
                  data={data.rooms}
                  item={el.name}
                  width={70}
                  height={70}
                  innerRadius={25}
                  outerRadius={35}
                />
              </div>
              <div className={styles.description}>
                <p>{el.name}</p>
                <p>{el.km} KM</p>
              </div>
            </div>
          ))}
        </Col>
        <Col s={9} className={styles.chartContainer}>
          <LinerChart width={800} height={400} margin={30} />
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(EnergyConsumption)
