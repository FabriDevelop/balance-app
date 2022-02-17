import React, { Dispatch, SetStateAction } from 'react'
import { BiEditAlt, BiTrashAlt } from 'react-icons/bi'
import moment from 'moment'
import 'moment/locale/es'
import IGasto from '../interfaces/IGasto'
import Swal from 'sweetalert2'
import useGastos from '../hooks/useGastos'
import { currencyFormat } from '../utils/validator'

type GastoProps = {
  gasto: IGasto
  setGastoEdit: Dispatch<IGasto>
  openModal: () => void
}

export default function Gasto({ gasto, setGastoEdit, openModal }: GastoProps) {
  const { amount, category, createdAt, id } = gasto
  const { deleteGasto } = useGastos()

  const onClickDelete = (id: string) => {
    Swal.fire({
      title: 'Estas seguro de que quieres eliminar el gasto?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteGasto(id)
      }
    })
  }

  return (
    <li
      className="grid w-full grid-cols-3 items-center justify-between gap-1 py-2.5 sm:gap-2 md:grid-cols-4
    md:gap-10"
    >
      <p className="text-center font-light text-red-600 md:text-left md:text-xl">
        {currencyFormat(amount)}
      </p>

      <p className="hidden md:inline-grid">{moment(createdAt).fromNow()}</p>

      <p className="text-center md:text-left">{category}</p>

      <div className="flex justify-center gap-3">
        <button
          className="button bg-blue-700 text-sm text-white"
          onClick={() => {
            setGastoEdit(gasto)
            openModal()
          }}
        >
          <BiEditAlt />
        </button>
        <button
          className="button bg-red-600 text-sm text-white"
          onClick={() => onClickDelete(id)}
        >
          <BiTrashAlt />
        </button>
      </div>
    </li>
  )
}
