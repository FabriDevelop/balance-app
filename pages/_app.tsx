import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/auth'
import { AuthGuard } from '../context/authGuard'
import Navbar from '../components/Navbar'
import Head from 'next/head'

function MyApp(props: AppProps) {
  const { Component, pageProps }: { Component: any; pageProps: any } = props
  return (
    <AuthProvider>
      {Component.requireAuth ? (
        <AuthGuard>
          <>
            <Navbar />
            <Component {...pageProps} />
          </>
        </AuthGuard>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
  )
}

export default MyApp
