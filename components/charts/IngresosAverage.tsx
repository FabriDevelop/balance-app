import { useEffect, useState } from 'react'
import useIngresos from '../../hooks/useIngresos'
import { getIngresosAvg } from '../../utils/chartData'
import { currencyFormat } from '../../utils/validator'

export default function IngresosAverage() {
  const [period, setPeriod] = useState('mensual')
  const [data, setData] = useState<number>()
  const { ingresos } = useIngresos()

  useEffect(() => {
    if (ingresos) {
      setData(getIngresosAvg(ingresos, period))
    }
  }, [ingresos])

  return (
    <div className="mt-4 flex flex-col">
      <div className="flex items-center gap-3">
        <h3>Promedio ingresos</h3>
        <select
          className="input text-sm"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="mensual">Mensual</option>
          <option value="semanal">Semanal</option>
        </select>
      </div>
      <p className="mt-4 text-4xl text-primary-500">{currencyFormat(data)}</p>
    </div>
  )
}
