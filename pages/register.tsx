import React, { FormEvent, useState } from 'react'
import Image from 'next/image'
import ilustration from '../assets/registerIlustration.svg'
import logo from '../assets/logo.svg'
import Link from 'next/link'
import { useAuth } from '../context/auth'
import { getErrorMessage } from '../utils/registerErrorMessages'
import Swal from 'sweetalert2'
import Router from 'next/router'
import Head from 'next/head'
import { motion } from 'framer-motion'

export default function register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const { register, error, setError } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (name && email && pass && confirmPass) {
      if (pass === confirmPass) {
        try {
          await register(email, name, pass)
          Swal.fire({
            title: 'Registro Exitoso',
            text: 'Te has registrado con exito',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          })
          Router.push('/login')
        } catch (error) {
          console.error(error)
        }
      } else {
        setError('passwords dont match')
      }
    }
  }

  return (
    <>
      <Head>
        <title>Balance | Registrarse</title>
      </Head>
      <motion.main
        initial={{ scale: 0, rotate: 180 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        className="container mx-auto flex h-screen items-center justify-center gap-20"
      >
        <div className="flex flex-col items-start gap-8 md:min-w-[40%] ">
          <Image src={logo} alt="Balance logo" />
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex w-full flex-col gap-2">
              <label className="label">Nombre completo:</label>
              <input
                type="text"
                className="input"
                placeholder="Nombre completo... "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <label className="label">Email:</label>
              <input
                type="email"
                className="input"
                placeholder="tucorreo@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <label className="label">Contraseña:</label>
              <input
                type="password"
                className="input"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <label className="label">Repetir contraseña:</label>
              <input
                type="password"
                className="input"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>
            {error && <p className="text-red-600">{getErrorMessage(error)}</p>}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="button w-28 bg-primary-500 text-white hover:bg-primary-600"
              >
                Registrar
              </button>
              <p className="font-bold">
                Ya tienes cuenta?{' '}
                <Link href={'/login'}>
                  <span className="cursor-pointer text-primary-500 hover:text-primary-600">
                    Inicia sesión aquí
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="hidden md:inline-flex">
          <Image src={ilustration} alt="undraw-illustration" />
        </div>
      </motion.main>
    </>
  )
}
