import React from 'react'
import IIngreso from '../interfaces/IIngreso'
import moment from 'moment'
import 'moment/locale/es'
import { BiEditAlt, BiTrashAlt } from 'react-icons/bi'
import useIngresos from '../hooks/useIngresos'
import Swal from 'sweetalert2'
import { currencyFormat } from '../utils/validator'

type IngresoProps = {
  ingreso: IIngreso
}

export default function Ingreso({ ingreso }: IngresoProps) {
  const { amount, createdAt, id } = ingreso
  const { deleteIngreso } = useIngresos()

  const onClickDelete = async () => {
    Swal.fire({
      title: 'Estas seguro de que quieres eliminar el ingreso?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteIngreso(id)
      }
    })
  }

  return (
    <li className="grid w-full grid-cols-3 justify-between gap-4 py-2 md:gap-10">
      <p className="text-xl font-light text-primary-500">
        {currencyFormat(amount)}
      </p>

      <p>{moment(createdAt).fromNow()}</p>

      <button
        className="button flex items-center gap-2 bg-red-600 text-sm text-white"
        onClick={() => onClickDelete()}
      >
        Eliminar
        <BiTrashAlt />
      </button>
    </li>
  )
}
