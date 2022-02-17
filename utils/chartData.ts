import { DocumentData } from 'firebase/firestore'
import { categories } from './categories'

export const getAmountPerDayData = (docs: DocumentData) => {
  let montStart = Date.now() - 2629800000
  let days = []
  let amounts = []
  let beginDay = montStart
  let endDay = beginDay + 86400000
  let date, day, mont, year

  for (let i = 0; i < 31; i++) {
    let totalDay = 0
    docs.forEach((doc: DocumentData) => {
      if (doc.createdAt > beginDay && doc.createdAt < endDay) {
        totalDay += doc.amount
      }
    })

    date = new Date(beginDay)
    days.push(`${date.getUTCDate()}`)
    amounts.push(totalDay)
    beginDay = endDay
    endDay = beginDay + 86400000
  }

  return {
    days,
    amounts,
  }
}

export const getAmountPerCategory = (gastos: DocumentData) => {
  let amounts: number[] = []
  let currentAmount: number
  categories.forEach((category) => {
    currentAmount = 0
    gastos.forEach((gasto: DocumentData) => {
      if (gasto.category === category) {
        currentAmount += gasto.amount
      }
    })
    amounts.push(currentAmount)
  })

  return {
    amounts,
  }
}

export const getIngresosAvg = (ingresos: DocumentData, period: string) => {
  let minDate = Number.POSITIVE_INFINITY
  ingresos.forEach((ingreso: DocumentData) => {
    if (minDate > ingreso.createdAt) {
      minDate = ingreso.createdAt
    }
  })

  const increment = period === 'mensual' ? 2629800000 : 604800000

  let monthlyIngresos = []
  let startDate = minDate
  let endDate = startDate + increment
  let ingresosMonth: number
  do {
    ingresosMonth = 0
    ingresos.forEach((ingreso: DocumentData) => {
      if (ingreso.createdAt >= startDate && ingreso.createdAt <= endDate) {
        ingresosMonth += ingreso.amount
      }
    })
    monthlyIngresos.push(ingresosMonth)
    startDate = endDate
    endDate += increment
  } while (endDate < Date.now())

  return sum(monthlyIngresos) / monthlyIngresos.length
}

const sum = (numbers: number[]) => {
  let sum = 0
  numbers.forEach((number) => (sum += number))
  return sum
}
