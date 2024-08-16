// eslint-disable-next-line no-unused-vars
import React, {createContext, useState} from 'react'

const Context = createContext()

const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = () => {
    setIsAuthenticated(true)
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return (
    <Context.Provider value={{isAuthenticated, login, logout}}>
      {children}
    </Context.Provider>
  )
}

export {Context, AuthProvider}
