import { motion } from 'framer-motion'
import React from 'react'
import useIngresos from '../hooks/useIngresos'
import IIngreso from '../interfaces/IIngreso'
import Ingreso from './Ingreso'
import Spinner from './Spinner'

export default function IngresosList() {
  const { ingresos, loading, error } = useIngresos()

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="flex flex-col items-center 
      justify-center gap-3 bg-white"
    >
      {loading ? (
        <Spinner />
      ) : (
        <ul className="h-[350px] scrollbar-hide md:overflow-y-auto md:scrollbar-default">
          {ingresos.map((ingreso: IIngreso) => (
            <Ingreso key={ingreso.id} ingreso={ingreso} />
          ))}
        </ul>
      )}
    </motion.section>
  )
}
