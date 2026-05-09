import { createContext, useContext, useReducer, useEffect } from 'react'

const AuthContext = createContext()

const saved = JSON.parse(localStorage.getItem('sara_user') || 'null')

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':  return { user: action.payload }
    case 'LOGOUT': return { user: null }
    default:       return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { user: saved })

  useEffect(() => {
    if (state.user) localStorage.setItem('sara_user', JSON.stringify(state.user))
    else            localStorage.removeItem('sara_user')
  }, [state.user])

  const login  = (user) => dispatch({ type: 'LOGIN',  payload: user })
  const logout = ()     => dispatch({ type: 'LOGOUT' })

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
