import { accountServiceInstance } from '@/services/account-service'
import { getJwt } from '@/storage/accountStorage'
import { IUserInfo } from '@/types/user'
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from 'react'

type AuthContextType = {
  user: IUserInfo | null
  setUser: Dispatch<SetStateAction<IUserInfo | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserInfo | null>(null)

  useEffect(() => {
    async function loadUser() {
      const jwt = await getJwt()
      if (jwt) {
        try {
          const userData = await accountServiceInstance.getUserData()
          setUser(userData)
        } catch (e) {
          setUser(null)
        }
      }
    }
    loadUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
