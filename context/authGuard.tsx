import { useAuth } from './auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function AuthGuard({ children }: { children: JSX.Element }) {
  const { user, initializing } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!initializing) {
      if (!user) {
        router.push('/login')
      }
    }
  }, [initializing, router, user])

  if (initializing) {
    return <h1>Loading...</h1>
  }

  if (!initializing && user) {
    return <>{children}</>
  }

  return null
}
