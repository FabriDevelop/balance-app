import { useState, useEffect } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  FirestoreError,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { getAuth } from 'firebase/auth'

export default function useGastos() {
  const [gastos, setGastos] = useState<DocumentData>([])
  const [totalGastos, setTotalGastos] = useState<number>()
  const [totalMes, setTotalMes] = useState<number>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<FirestoreError | null | unknown>(null)
  const gastosRef = collection(db, 'gastos')

  const { currentUser } = getAuth()

  useEffect(() => {
    setLoading(true)
    getGastos()
  }, [])

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
        let totalMes = 0
        data.map((doc: DocumentData) => {
          total += doc.amount
          if (doc.createdAt >= Date.now() - 2629800000) {
            totalMes += doc.amount
          }
        })
        setTotalGastos(total)
        setGastos(data)
        setTotalMes(totalMes)
        setLoading(false)
      },
      (error) => setError(error)
    )

    return () => unsubscribe()
  }

  const getGastoPerCategory = (category: string) => {
    setLoading(true)
    const q = query(gastosRef, where('category', '==', category))
    if (category) {
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const data: DocumentData = []
          querySnapshot.forEach((doc) =>
            data.push({ ...doc.data(), id: doc.id })
          )
          setGastos(data)
          setLoading(false)
        },
        (error) => setError(error)
      )
      return () => unsubscribe()
    } else {
      getGastos()
    }
  }

  const addGasto = async (
    amount: number | undefined,
    category: string,
    userID: string | undefined
  ) => {
    try {
      await addDoc(gastosRef, {
        amount,
        category,
        createdAt: Date.now(),
        userID,
      })
    } catch (error) {
      setError(error)
    }
  }

  const updateGasto = async (id: string, amount: number, category: string) => {
    setLoading(true)
    try {
      const gastoDocRef = doc(db, 'gastos', id)
      await updateDoc(gastoDocRef, {
        amount: amount,
        category: category,
      })
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const deleteGasto = async (id: string) => {
    try {
      setLoading(true)
      const gastoDocRef = doc(db, 'gastos', id)
      await deleteDoc(gastoDocRef)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    gastos,
    getGastoPerCategory,
    loading,
    error,
    addGasto,
    updateGasto,
    deleteGasto,
    totalGastos,
    totalMes,
  }
}
