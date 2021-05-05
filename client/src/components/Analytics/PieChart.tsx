import * as d3 from 'd3'
import React from 'react'

interface ArcProps {
  data: object
  index: number
  createArc: (object) => string
  color: string
  format: () => string
}

const Arc: React.FC<ArcProps> = ({ data, index, createArc, color, format }) => (
  <g key={index} className="arc">
    <path className="arc" d={createArc(data)} fill={color} />
  </g>
)

interface PieChartProps {
  width: number
  height: number
  innerRadius: number
  outerRadius: number
  data: object[]
  item?: string
  icon?: any
}

const PieChart: React.FC<PieChartProps> = (props) => {
  const { width, height, innerRadius, outerRadius, data, item, icon } = props
  const createPie = d3
    .pie()
    .value((d) => d.value)
    .sort(null)
  const createArc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius)
  const createArcRound = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius).cornerRadius(20)
  const format = d3.format('.2f')
  const pieData = createPie(data)
  const insideContent = icon || `${pieData.find((el) => el.data.name === item)?.value}%`

  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <g transform={`translate(${outerRadius} ${outerRadius})`}>
        <circle cx="0" cy="0" r={outerRadius} fill="#3e4e6c" />
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
        <circle cx="0" cy="0" r={innerRadius} fill="#242E42" />
        {icon ? (
          <image href={icon} height="50" width="50" x="-25" y="-26" />
        ) : (
          <text
            textAnchor="middle"
            alignmentBaseline="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="20"
            fontWeight="300"
          >
            {insideContent}
          </text>
        )}
      </g>
    </svg>
  )
}

export default PieChart
