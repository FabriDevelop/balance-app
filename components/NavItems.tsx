import React from 'react'
import Link from 'next/link'

import { BiChart, BiHistory, BiHomeAlt } from 'react-icons/bi'
import { useRouter } from 'next/router'

export default function NavItems() {
  const router = useRouter()

  return (
    <>
      <Link href={'/'}>
        <li
          className={
            router.pathname === '/' ? 'nav-item text-primary-500' : 'nav-item'
          }
        >
          Panel Principal
          <BiHomeAlt fontSize={24} />
        </li>
      </Link>
      <Link href={'/registro'}>
        <li
          className={
            router.pathname === '/registro'
              ? 'nav-item text-primary-500'
              : 'nav-item'
          }
        >
          Registro de movimientos
          <BiHistory fontSize={24} />
        </li>
      </Link>
      <Link href={'/estadisticas'}>
        <li
          className={
            router.pathname === '/estadisticas'
              ? 'nav-item text-primary-500'
              : 'nav-item'
          }
        >
          Estadísticas
          <BiChart fontSize={24} />
        </li>
      </Link>
    </>
  )
}
