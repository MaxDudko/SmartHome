import * as d3 from 'd3'
import { select } from 'd3-selection'
import React from 'react'
import styles from '../Analytics/Analytics.module.scss'

const LinerChart = (props) => {
  const { width, height, data, colors } = props

  const xScale = d3
    .scaleTime()
    .range([0, width - 70])
    .domain([new Date(2020, 0, 1), new Date(2020, 10, 31)])

  const yScale = d3
    .scaleLinear()
    .range([height - 50, 50])
    .domain([100, 700])

  const xAxis = d3
    .axisBottom(xScale)
    .ticks(12)
    .tickFormat(d3.timeFormat('%b'))
    .tickSize(-height + 100)
    .tickPadding(25)

  const yAxis = d3
    .axisLeft(yScale)
    .ticks(6)
    .tickSize(-width + 70)
    .tickPadding(30)

  const line = d3
    .line()
    .x((d) => xScale(d.period))
    .y((d) => yScale(+d.value))

  return (
    <svg height={height} width={width} className={styles.lineChart}>
      <g
        className="x-axis"
        ref={(node) => select(node).call(xAxis)}
        transform={`translate(50 ${height - 50})`}
        strokeDasharray="5"
      />
      <g
        className="y-axis"
        ref={(node) => select(node).call(yAxis)}
        transform={`translate(50 0)`}
      />
      {data.map((d, i) => {
        return (
          <>
            {/*<defs>*/}
            {/*  <linearGradient id="gradient" gradientTransform="rotate(90)">*/}
            {/*    <stop offset="50%" stopColor={colors[i]} />*/}
            {/*    <stop offset="0%" stopColor="transparent" />*/}
            {/*  </linearGradient>*/}
            {/*</defs>*/}
            <path
              d={line(d)}
              transform={`translate(50 0)`}
              key={i}
              fill={i === 0 ? colors[i] : 'none'}
              stroke={colors[i]}
              strokeWidth="2"
              fillOpacity="0.05"
            />
          </>
        )
      })}
      {data.map((d, i) => {
        const color = colors[i]
        return d.map((d, i) => {
          if (i > 0) {
            return (
              <circle
                key={i}
                cx={xScale(d.period)}
                cy={yScale(+d.value)}
                r="2"
                transform={`translate(50 0)`}
                stroke={color}
                fill="#2F3B52"
              />
            )
          } else {
            return null
          }
        })
      })}
    </svg>
  )
}

export default LinerChart
