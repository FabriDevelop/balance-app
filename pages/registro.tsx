import { motion } from 'framer-motion'
import Head from 'next/head'
import React, { useState } from 'react'
import GastosList from '../components/GastosList'
import IngresosList from '../components/IngresosList'

export default function registro() {
  const [movementType, setMovementType] = useState('ingreso')

  return (
    <>
      <Head>
        <title>Balance | Registro</title>
      </Head>
      <motion.main
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="container m-10 mx-auto flex h-screen 
                 max-w-5xl flex-col items-center justify-start gap-8"
      >
        <div className="flex gap-1">
          <button
            type="button"
            className={
              movementType === 'ingreso'
                ? 'switch border-primary-500'
                : 'switch border-gray-200'
            }
            onClick={() => setMovementType('ingreso')}
          >
            Ingresos
          </button>
          <button
            type="button"
            className={
              movementType === 'gasto'
                ? 'switch border-primary-500'
                : 'switch border-gray-200'
            }
            onClick={() => setMovementType('gasto')}
          >
            Gastos
          </button>
        </div>

        {movementType === 'ingreso' ? <IngresosList /> : <GastosList />}
      </motion.main>
    </>
  )
}

registro.requireAuth = true
