import { collection, DocumentData, query, where } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import useGastos from './useGastos'
import useIngresos from './useIngresos'
import { getAuth } from 'firebase/auth'

export default function useBalance() {
  const [balance, setBalance] = useState<number | undefined>()
  const [gastos, setGastos] = useState<DocumentData>([])
  const [ingresos, setIngresos] = useState<DocumentData>([])
  const [loading, setLoading] = useState<boolean>(false)
  const gastosRef = collection(db, 'gastos')
  const ingresosRef = collection(db, 'ingresos')
  const { currentUser } = getAuth()

  useEffect(() => {}, [])

  const getIngresos = () => {
    const q = query(ingresosRef, where('userID', '==', currentUser?.uid))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: DocumentData = []
        snapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }))
        data.sort(
          (a: DocumentData, b: DocumentData) => b.createdAt - a.createdAt
        )
        let total = 0
        data.map((doc: DocumentData) => (total += doc.amount))
        setIngresos(data)
        setLoading(false)
      },
      (error) => setError(error)
    )

    return () => unsubscribe()
  }

  const getGastos = () => {
    const q = query(gastosRef, where('userID', '==', currentUser?.uid))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: DocumentData = []
        snapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }))
        data.sort(
          (a: DocumentData, b: DocumentData) => b.createdAt - a.createdAt
        )
        let total = 0
        data.map((doc: DocumentData) => (total += doc.amount))
        setTotalGastos(total)
        setGastos(data)
        setLoading(false)
      },
      (error) => setError(error)
    )

    return () => unsubscribe()
  }

  return { balance }
}
