import React, { useState } from 'react'
import { BiFilterAlt } from 'react-icons/bi'
import useGastos from '../hooks/useGastos'
import Gasto from './Gasto'
import { categories } from '../utils/categories'
import Modal from 'react-modal'
import EditModal from './EditModal'
import IGasto from '../interfaces/IGasto'
import Spinner from './Spinner'
import { motion } from 'framer-motion'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroungColor: 'transparent',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
}

export default function GastosList() {
  const { gastos, loading, getGastoPerCategory } = useGastos()

  const [modalIsOpen, setIsOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<string>('')
  const [gastoEdit, setGastoEdit] = useState<IGasto>({
    amount: 0,
    category: '',
    createdAt: 0,
    userID: '',
    id: '',
  })

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className=" flex-col items-center gap-3 bg-white"
    >
      <div className="flex items-center justify-center gap-5 text-sm text-dark md:text-base">
        <BiFilterAlt fontSize={24} />
        <label className="ml-1 text-lg font-bold">Categoria: </label>
        <select
          className="input pr-2"
          value={currentCategory}
          onChange={(e) => {
            setCurrentCategory(e.target.value)
            getGastoPerCategory(e.target.value)
          }}
        >
          <option value={''}>Todas las categorias</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <ul className="mt-4 h-[380px] overflow-x-auto overflow-y-auto text-sm md:text-base">
          {gastos.map((gasto: IGasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEdit={setGastoEdit}
              openModal={openModal}
            />
          ))}
        </ul>
      )}

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <EditModal
          movementType="gasto"
          gasto={gastoEdit}
          closeModal={closeModal}
        />
      </Modal>
    </motion.section>
  )
}
