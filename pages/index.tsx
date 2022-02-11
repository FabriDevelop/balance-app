import Head from 'next/head'
import Router from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../context/auth'

export default function Home() {
  const { logout, user } = useAuth()

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1>Hi {user?.displayName}!</h1>
      <button className="bg-gray-300 p-3" onClick={logout}>
        Log Out
      </button>
    </div>
  )
}

Home.requireAuth = true
