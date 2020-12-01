import React, {useState, useEffect} from 'react'
import { Bar } from '@reactchartjs/react-chart.js'
import moment from 'moment'

const dataTemp = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'Páginas Leídas',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

const options = {
    maintainAspectRatio: true,
    scales: {
        yAxes: [
        {
            ticks: {
            beginAtZero: true,
            },
        },
        ],
    },
}

const WeekStatsChart = ({pagesRead}) => {

    const [data, setData] = useState({})

    useEffect(() => {
        const format = "DD-MM-YY"
        const today = moment().format(format)
        console.log({pagesRead})
        if (pagesRead) {
            let labels = []
            let values = []
            for(let i = 0; i < 7; i++) {
                const day = moment().day(i)
                const dayKey = day.format(format)
                labels.push(dayKey)
                values.push(pagesRead.[dayKey] ? pagesRead.[dayKey] : 0)
            }

            setData({
              labels,
              datasets: [
                {
                  label: 'Páginas Leídas',
                  data: values,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
                  borderWidth: 1,
                }
              ]
            })
            console.log({labels, values})
        }
    }, [pagesRead])
    return (
        <>
        <div className='header'>
          <h3 className='title'>Esta semana</h3>
        </div>
        <Bar 
            data={data} 
            options={options} 
            height={3}
            width={3}
        />
      </>
    )
}

export default WeekStatsChart