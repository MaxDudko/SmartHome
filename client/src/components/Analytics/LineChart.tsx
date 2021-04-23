import * as d3 from 'd3'
import { select } from 'd3-selection'
import React, { useEffect, useState } from 'react'
import styles from '../Analytics/Analytics.module.scss'

const Tooltip = ({ height, x }) => {
  console.log(x)
  return (
    <g>
      <rect
        width="66"
        height={height}
        x={x - 30}
        y={height - 20}
        transform={`translate(-5 -${height - 70})`}
        rx="4"
        fill="#2b374d"
        opacity="0.5"
      />
      <rect
        x={x - 30}
        y={height - 50}
        width="66"
        height="30"
        transform={`translate(-5 -${height - 70})`}
        fill="#1F8EFA"
      />
      <text
        x={x - 52}
        y={height - 50}
        transform={`translate(26 -${height - 90})`}
        fontSize="20px"
        fill="#fff"
      >
        1,458
      </text>
      <polygon points={`${x - 5},${50} ${x + 5},${50} ${x},${55}`} fill="#1F8EFA" />
      <line
        x1={x}
        y1={58}
        x2={x}
        y2={height - 50}
        fill="#1F8EFA"
        stroke="#1F8EFA"
        strokeWidth="3"
        strokeDasharray="5"
      />
      <circle cx={x} cy={height - 50} r="6" fill="#1F8EFA" />
    </g>
  )
}

const LinerChart = (props) => {
  const { width, height, data, colors } = props
  const [isTooltip, showTooltip] = useState(false)
  const [xTooltip, setXTooltip] = useState(0)

  useEffect(() => {
    // console.log(d3.selectAll('.tick'))
  })

  const xScale = d3
    .scaleTime()
    .range([50, width - 50])
    .domain([new Date(2020, 0, 1), new Date(2020, 10, 31)])
    .interpolate(d3.interpolateRound)

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
    .tickSize(-width + 100)
    .tickPadding(25)

  const line = d3
    .line()
    .x((d) => xScale(d.period))
    .y((d) => yScale(+d.value))

  const area = d3
    .area()
    .x((d) => xScale(d.period))
    .y0(height - 50)
    .y1((d) => yScale(+d.value))

  const tooltipData = (e) => {
    const tickW = (width - 80) / 12
    const counter = 0
    const ticksX = Array(12).map((t) => counter)
    setXTooltip(xScale.invert(e.nativeEvent.layerX))
    console.log(':', e.nativeEvent.layerX)
    console.log(xTooltip)
    console.log(data)
  }

  return (
    <>
      <svg height={height} width={width} className={styles.lineChart}>
        <g
          className="x-axis"
          ref={(node) => select(node).call(xAxis)}
          transform={`translate(0 ${height - 50})`}
          strokeDasharray="5"
          // children={<Tooltip height={height} x={xScale(xTooltip)} />}
        />
        <g
          className="y-axis"
          ref={(node) => select(node).call(yAxis)}
          transform={`translate(50 0)`}
        />
        {data.map((d, i) => {
          return (
            <path
              d={line(d)}
              key={i}
              fill={'none'}
              stroke={colors[i]}
              strokeWidth="2"
              // fillOpacity="0.05"
            />
          )
        })}
        <g>
          <linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
            <stop stopColor={colors[0]} offset="20%" />
            <stop stopColor="#2f3b52" offset="100%" />
          </linearGradient>
          <path d={area(data[0])} fill="url('#Gradient1')" fillOpacity="0.1" />
        </g>
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
                  stroke={color}
                  fill="#2F3B52"
                />
              )
            } else {
              return null
            }
          })
        })}
        <rect
          className="rect"
          width={width - 80}
          height={height - 50}
          transform={`translate(40 50)`}
          fill="transparent"
          onMouseOver={(e) => tooltipData(e)}
          onMouseMove={(e) => tooltipData(e)}
          onMouseOut={(e) => tooltipData(e)}
        />
        <Tooltip height={height} x={xScale(xTooltip)} />
      </svg>
    </>
  )
}

export default LinerChart
