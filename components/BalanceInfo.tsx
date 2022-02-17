import React, { useEffect, useState } from 'react'
import useGastos from '../hooks/useGastos'
import useIngresos from '../hooks/useIngresos'
import { currencyFormat } from '../utils/validator'
import Spinner from './Spinner'

export default function BalanceInfo() {
  const [balance, setBalance] = useState<number>()
  const { totalIngresos, totalMes: totalMesIngresos } = useIngresos()
  const { totalGastos, totalMes: totalMesGastos } = useGastos()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const i = totalIngresos ? totalIngresos : 0
    const g = totalGastos ? totalGastos : 0
    setBalance(i - g)
    setLoading(false)
  }, [totalGastos, totalIngresos])

  return (
    <section className="flex flex-col items-center justify-center gap-6 md:items-start">
      <div className="flex flex-col gap-2">
        <p className="text-gray-500">Saldo actual: </p>
        {loading ? (
          <Spinner />
        ) : (
          <p
            className={`text-4xl ${
              balance && balance >= 0 ? 'text-dark' : 'text-red-600'
            }`}
          >
            {balance ? currencyFormat(balance) : 0}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <p className="text-gray-500">Ingresos ultimo mes:</p>
        <p className="text-xl text-primary-500">
          {currencyFormat(totalMesIngresos)}
        </p>
        <p className="mt-3 text-gray-500">Gastos ultimo mes:</p>
        <p className="text-xl text-red-600">{currencyFormat(totalMesGastos)}</p>
      </div>
    </section>
  )
}
