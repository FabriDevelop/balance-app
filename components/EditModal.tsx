import { DocumentData } from 'firebase/firestore'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import useGastos from '../hooks/useGastos'
import IGasto from '../interfaces/IGasto'
import { categories } from '../utils/categories'
import { RingLoader } from 'react-spinners'

type EditModalProps = {
  movementType: string
  gasto: IGasto
  closeModal: () => void
}

export default function EditModal({
  movementType,
  gasto,
  closeModal,
}: EditModalProps) {
  const [currentGasto, setcurrentGasto] = useState<IGasto>({
    amount: gasto.amount,
    id: gasto.id,
    userID: gasto.userID,
    category: gasto.category,
    createdAt: gasto.createdAt,
  })
  const { loading, updateGasto } = useGastos()

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setcurrentGasto({
      ...currentGasto,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await updateGasto(gasto.id, currentGasto.amount, currentGasto.category)
    Swal.fire({
      title: 'Modificación Exitosa',
      text: 'Registro modificado con exito',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    })
    closeModal()
  }

  if (movementType === 'gasto') {
    return (
      <form className="flex flex-col gap-6 py-8 px-10" onSubmit={handleSubmit}>
        <h2 className="text-center text-xl font-semibold">Editar Gasto</h2>
        <div className="flex flex-col gap-2">
          <label>Monto:</label>
          <input
            type="text"
            className="input-text"
            value={currentGasto.amount}
            name="amount"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <label>Categoria: </label>
          <select
            className="input-text"
            placeholder="Selecciona una categoria"
            name="category"
            onChange={handleChange}
            value={currentGasto.category}
          >
            <option value="">Selecciona una opción</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center gap-3">
          <button
            className="button bg-primary-600 text-sm text-white"
            type="submit"
          >
            {loading ? '...' : 'Editar'}
          </button>
          <button
            className="button bg-red-600 text-sm text-white"
            type="button"
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div>
      </form>
    )
  } else {
    return <form> Ingreso form</form>
  }
}
