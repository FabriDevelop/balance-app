import React, { ChangeEvent, FormEvent, useState } from 'react'
import { BiMoney } from 'react-icons/bi'
import { categories } from '../utils/categories'
import { isNumber } from '../utils/validator'
import useGastos from '../hooks/useGastos'
import { useAuth } from '../context/auth'
import useIngresos from '../hooks/useIngresos'
import Swal from 'sweetalert2'

export default function MovementForm() {
  const [movementType, setMovementType] = useState('ingreso')
  const [amount, setAmount] = useState<number>()
  const [category, setCategory] = useState<string>('')

  const { addGasto } = useGastos()
  const { addIngreso } = useIngresos()
  const { user } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (movementType === 'gasto') {
        if (amount && category) {
          await addGasto(amount, category, user?.uid)
        } else {
          Swal.fire({
            title: 'Todos los campos son obligatorios',
            text: 'Porfavor rellena todos los campos',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          })
        }
      } else {
        if (amount) {
          await addIngreso(amount, user?.uid)
        } else {
          Swal.fire({
            title: 'Todos los campos son obligatorios',
            text: 'Porfavor ingresa la cantidad del ingreso',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          })
        }
      }
      setAmount(0)
      setCategory('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNumber(e.target.value)) {
      setAmount(Number(e.target.value))
    }
  }

  return (
    <form
      className="flex flex-col gap-8 bg-white p-10 shadow-2xl md:grid-flow-col 
      md:gap-5"
      onSubmit={handleSubmit}
    >
      <h2 className="text-center text-lg font-bold">Agregar movimiento: </h2>
      <div className="flex flex-col gap-2">
        <label>Tipo de movimiento:</label>
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
            Ingreso
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
            Gasto
          </button>
        </div>
      </div>

      {movementType === 'gasto' && (
        <div className="flex flex-col gap-2 ">
          <label>Categoria: </label>
          <select
            className="input-text"
            placeholder="Selecciona una categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Selecciona una opción</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label>Cantidad: </label>
        <div className="flex items-center">
          <input
            type="text"
            name="category"
            className="input-text w-full"
            value={amount}
            onChange={handleAmount}
          />
          <BiMoney className="-ml-8 text-primary-500" />
        </div>
      </div>

      <button
        className="button text-light w-full self-end bg-primary-500 font-light text-white"
        type="submit"
      >
        Registrar
      </button>
    </form>
  )
}
