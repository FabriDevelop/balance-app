import { useAuth } from './auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Spinner from '../components/Spinner'

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
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!initializing && user) {
    return <>{children}</>
  }

  return null
}
