import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  FirestoreError,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { getAuth } from 'firebase/auth'

export default function useIngresos() {
  const [ingresos, setIngresos] = useState<DocumentData>([])

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<FirestoreError | null | unknown>()
  const ingresosRef = collection(db, 'ingresos')

  const [totalIngresos, setTotalIngresos] = useState<number>()
  const [totalMes, setTotalMes] = useState<number>()

  const { currentUser } = getAuth()

  useEffect(() => {
    setLoading(true)
    getIngresos()
  }, [])

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
        let totalMes = 0
        data.map((doc: DocumentData) => {
          total += doc.amount
          if (doc.createdAt >= Date.now() - 2629800000) {
            totalMes += doc.amount
          }
        })

        setIngresos(data)
        setTotalIngresos(total)
        setTotalMes(totalMes)

        setLoading(false)
      },
      (error) => setError(error)
    )

    return () => unsubscribe()
  }

  const addIngreso = async (
    amount: number | undefined,
    userID: string | undefined
  ) => {
    try {
      setLoading(true)
      await addDoc(ingresosRef, {
        amount,
        userID,
        createdAt: Date.now(),
      })
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const deleteIngreso = async (id: string) => {
    try {
      const ingresoDocRef = doc(db, 'ingresos', id)
      await deleteDoc(ingresoDocRef)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    ingresos,
    loading,
    error,
    addIngreso,
    deleteIngreso,
    totalIngresos,
    totalMes,
  }
}
