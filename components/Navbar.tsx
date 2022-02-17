import Image from 'next/image'
import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import { BiLogOut, BiMenu, BiX } from 'react-icons/bi'

import { useAuth } from '../context/auth'
import NavItems from './NavItems'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [openMenu, setOpenMenu] = useState(false)

  const defaultUserImg =
    'https://www.nicepng.com/png/detail/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png'

  return (
    <header className="max-h-24 px-5 py-5 shadow-xl md:px-0">
      <nav className="container mx-auto flex items-center justify-between">
        <button
          className="text-primary-500 xl:hidden"
          onClick={() => setOpenMenu(true)}
        >
          <BiMenu fontSize={40} />
        </button>

        {openMenu && (
          <div
            className="fixed top-0 left-0 z-10 h-full
            bg-white p-10 pt-40 shadow-2xl "
          >
            <button
              className="absolute right-10 top-10 text-dark"
              onClick={() => setOpenMenu(false)}
            >
              <BiX fontSize={40} />
            </button>

            <ul className="flex flex-col gap-10">
              <div className="lg:hidden">
                <Image src={logo} alt="balance-logo" />
              </div>
              <NavItems />
            </ul>
          </div>
        )}

        <div className="hidden lg:flex">
          <Image src={logo} alt="balance-logo" />
        </div>

        <ul className="hidden gap-6 xl:flex">
          <NavItems />
        </ul>

        <div className="flex items-center gap-3">
          <Image
            src={user?.photoURL ? user?.photoURL : defaultUserImg}
            width="50px"
            height={'50px'}
            className="rounded-full"
          />
          <p className="w-28 truncate font-semibold">
            {user?.displayName &&
              user.displayName.split(' ').slice(0, 2).join(' ')}
          </p>
          <button className="ml-3 text-red-600" onClick={logout}>
            <BiLogOut fontSize={24} />
          </button>
        </div>
      </nav>
    </header>
  )
}
