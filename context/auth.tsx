import {
  createContext,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  Dispatch,
  FormEvent,
} from 'react'
import {
  User,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import app from '../firebase/config'

interface IAuth {
  initializing: boolean
  user: User | null
  loginWithGoogle: (e: FormEvent) => void
  logout: () => void
  register: (email: string, username: string, password: string) => void
  error: string
  setError: Dispatch<SetStateAction<string>>
  login: (email: string, password: string) => void
}

const auth = getAuth(app)

const AuthContext = createContext<IAuth>({
  initializing: false,
  user: null,
  loginWithGoogle: () => {},
  login: () => {},
  logout: () => {},
  register: () => {},
  error: '',
  setError: () => {},
})

const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string>('')
  const [initializing, setInitializing] = useState<boolean>(true)

  useEffect(() => {
    const unSuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setInitializing(false)
    })

    return unSuscribe
  }, [])

  const loginWithGoogle = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res = await signInWithPopup(auth, new GoogleAuthProvider())
      setUser(res.user)
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.error(error)
    }
  }

  const register = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(res.user, {
        displayName: username,
      })
    } catch (error: any) {
      setError(error.code)
      console.error(error)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      setUser(res.user)
    } catch (error: any) {
      setError(error.code)
      console.error(error.code)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        initializing,
        user,
        loginWithGoogle,
        logout,
        register,
        error,
        setError,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)
const getSession = () => {
  return auth
}

export { AuthProvider, useAuth, getSession }
