import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/auth'
import { AuthGuard } from '../context/authGuard'
import {} from 'next'
import { ComponentType } from 'react'

function MyApp(props: AppProps) {
  const { Component, pageProps }: { Component: any; pageProps: any } = props
  return (
    <AuthProvider>
      {Component.requireAuth ? (
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
  )
}

export default MyApp
