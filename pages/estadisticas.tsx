import React, { useEffect, useState } from 'react'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import useGastos from '../hooks/useGastos'
import { getAmountPerDayData } from '../utils/chartData'
import useIngresos from '../hooks/useIngresos'
import GastoPerCategory from '../components/charts/GastoPerCategory'
import IngresosAverage from '../components/charts/IngresosAverage'
import Head from 'next/head'
import { motion } from 'framer-motion'

export default function estadisticas() {
  const { gastos } = useGastos()
  const { ingresos } = useIngresos()

  const [lineChartData, setLineChartData] = useState<any>()
  const [timeline, setTimeline] = useState('mes')

  useEffect(() => {
    if (gastos && ingresos) {
      setLineChartData({
        labels:
          timeline === 'semana'
            ? getAmountPerDayData(gastos).days.slice(23, 31)
            : getAmountPerDayData(gastos).days,
        datasets: [
          {
            label: 'Gastos',
            data:
              timeline === 'semana'
                ? getAmountPerDayData(gastos).amounts.slice(23, 31)
                : getAmountPerDayData(gastos).amounts,
            borderWith: 1,
            fill: false,
            borderColor: '#dc2626',
            tension: 0.1,
          },
          {
            label: 'Ingresos',
            data:
              timeline === 'semana'
                ? getAmountPerDayData(ingresos).amounts.slice(23, 31)
                : getAmountPerDayData(ingresos).amounts,
            borderWith: 1,
            fill: false,
            borderColor: '#009F93',
            tension: 0.1,
          },
        ],
      })
    } else {
      setLineChartData(null)
    }
  }, [gastos, ingresos, timeline])

  return (
    <>
      <Head>
        <title>Balance | Estadísticas</title>
      </Head>
      <motion.main
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="container mx-auto mt-4 grid grid-flow-row grid-cols-1 
         gap-4 overflow-y-auto pr-5 lg:grid-flow-col lg:grid-cols-2"
      >
        <section className="col-span-1 flex flex-col bg-white p-5 shadow-xl">
          <div className="flex items-center gap-4">
            <h2 className="font bold text-2xl">Ingresos vs Gastos</h2>
            <select
              className="input"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
            >
              <option value="mes">Último Mes</option>
              <option value="semana">Última Semana</option>
            </select>
          </div>
          <div className="">
            {lineChartData && <Line data={lineChartData} height={100} />}
          </div>

          <IngresosAverage />
        </section>

        <section className="flex flex-col justify-center bg-white p-5 shadow-xl">
          <h2 className="font bold text-center text-2xl">
            Gastos por categoria
          </h2>
          <GastoPerCategory />
        </section>
      </motion.main>
    </>
  )
}

estadisticas.requireAuth = true
