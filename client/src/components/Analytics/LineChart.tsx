import * as d3 from 'd3'
import { select } from 'd3-selection'
import React, { useEffect, useState } from 'react'
import styles from '../Analytics/Analytics.module.scss'

interface TooltipProps {
  height: number
  x: number
  value: string
  label: string
}

const Tooltip: React.FC<TooltipProps> = ({ height, x, value, label }) => (
  <g>
    <rect
      width="66"
      height={height - 50}
      x={x - 30}
      y={height - 20}
      transform={`translate(-5 -${height - 70})`}
      rx="5"
      ry="5"
      fill="#2b374d"
      opacity="0.5"
    />
    <rect
      x={x - 30}
      y={height - 50}
      width="66"
      height="24"
      transform={`translate(-5 -${height - 70})`}
      fill="#1F8EFA"
    />
    <text
      x={x - 52}
      y={height - 52}
      textAnchor="start"
      transform={`translate(26 -${height - 90})`}
      fontSize="20px"
      fontWeight={400}
      fill="#fff"
    >
      {value}
    </text>
    <polygon points={`${x - 5},${42} ${x + 5},${42} ${x},${50}`} fill="#1F8EFA" />
    <line
      x1={x}
      y1={52}
      x2={x}
      y2={height - 50}
      fill="#1F8EFA"
      stroke="#1F8EFA"
      strokeWidth="2.6"
      strokeDasharray="4"
    />
    <circle cx={x} cy={height - 50} r="6" fill="#1F8EFA" />
    <rect
      x={x - 20}
      y={height - 30}
      width="32"
      height="24"
      textAnchor="start"
      fontSize="10px"
      fontWeight={400}
      fill="#2D394F"
    />
    <text
      x={x - 10}
      y={height - 18}
      textAnchor="start"
      fontSize="10px"
      fontWeight={600}
      fill="#B0B5BD"
    >
      {label}
    </text>
  </g>
)

interface LinerChartProps {
  width: number
  height: number
  data: any
  colors: string[]
}

const LinerChart: React.FC<LinerChartProps> = (props) => {
  const { width, height, data, colors } = props
  const [label, setLabel] = useState('')
  const [tooltipValue, setTooltipValue] = useState('')
  const [xTooltip, setXTooltip] = useState<any>(0)
  const [startDate, setStartDate] = useState<any>(0)
  const [endDate, setEndDate] = useState<any>(0)

  useEffect(() => {
    setStartDate(data[0][0].period)
    setEndDate(data[0][data[0].length - 1].period)
  }, [data])

  const xScale = d3
    .scaleTime()
    .range([50, width - 50])
    .domain([new Date(startDate), new Date(endDate)])
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
    const date = new Date(xScale.invert(e.nativeEvent.layerX))
    date.setDate(1)

    let sum = 0
    data.forEach((item) => {
      const value = item.find((e) => e.period.getMonth() === date.getMonth())?.value
      sum += value || 0
    })

    setTooltipValue(sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
    setLabel(date.toString().split(' ')[1].toUpperCase())

    if (date >= startDate && date <= endDate && !xTooltip) {
      return setXTooltip(date)
    }

    if (date >= startDate && date <= endDate && date.toDateString() !== xTooltip.toDateString()) {
      setXTooltip(date)
    }
  }

  return (
    <>
      <svg className={styles.lineChart} viewBox={`0 0 ${width} ${height}`}>
        <g
          className="x-axis"
          ref={(node) => select(node).call(xAxis)}
          transform={`translate(0 ${height - 50})`}
          strokeDasharray="5"
        />
        <g
          className="y-axis"
          ref={(node) => select(node).call(yAxis)}
          transform={`translate(50 0)`}
        />
        {data.map((d, i) => {
          return <path d={line(d)} key={i} fill={'none'} stroke={colors[i]} strokeWidth="2" />
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
                  r="1.8"
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
          onMouseMove={(e) => tooltipData(e)}
        />
        <Tooltip height={height} x={xScale(xTooltip)} value={tooltipValue} label={label} />
      </svg>
    </>
  )
}

export default LinerChart
