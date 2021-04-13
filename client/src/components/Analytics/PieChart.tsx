import * as d3 from 'd3'
import React from 'react'

const Arc = ({ data, index, createArc, color, format }) => (
  <g key={index} className="arc">
    <path className="arc" d={createArc(data)} fill={color} />
  </g>
)

const PieChart = (props) => {
  const { width, height, innerRadius, outerRadius, data, item } = props
  const createPie = d3
    .pie()
    .value((d) => d.value)
    .sort(null)
  const createArc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius)
  const createArcRound = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius).cornerRadius(20)
  const format = d3.format('.2f')
  const pieData = createPie(data)
  const text = `${pieData.find((el) => el.data.name === item).value}%`

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${outerRadius} ${outerRadius})`}>
        {pieData.map((d, i) => (
          <Arc
            key={i}
            data={d}
            index={i}
            createArc={item === d.data.name ? createArcRound : createArc}
            color={item === d.data.name ? d.data.color : '#3e4e6c'}
            format={format}
          />
        ))}
        <text
          transform={`translate(${createArc.centroid(data)})`}
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="white"
          fontSize="20"
        >
          {text}
        </text>
      </g>
    </svg>
  )
}

export default PieChart
