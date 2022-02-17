import React, { useEffect, useState } from 'react'
import 'chart.js/auto'
import { Pie } from 'react-chartjs-2'
import useGastos from '../../hooks/useGastos'
import { categories } from '../../utils/categories'
import { getAmountPerCategory } from '../../utils/chartData'

export default function GastoPerCategory() {
  const { gastos } = useGastos()

  const [data, setData] = useState<any>()

  useEffect(() => {
    if (gastos) {
      console.log(getAmountPerCategory(gastos))

      setData({
        labels: categories,
        datasets: [
          {
            label: 'Categorías',
            data: getAmountPerCategory(gastos).amounts,
            backgroundColor: [
              '#009F93',
              '#dc2626',
              '#1d4ed8',
              '#9F009A',
              '#9C9F00',
              '#00959F',
              '#9F6900',
              '#009F8C',
            ],
          },
        ],
      })
    }
  }, [gastos])

  return (
    <div className="px-16 py-4">{data && <Pie data={data} height={10} />}</div>
  )
}
