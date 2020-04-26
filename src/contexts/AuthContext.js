import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ loading: true, data: null })

  useEffect(() => {
    const data = window.localStorage.getItem("authData")
    setAuth(data ? JSON.parse(data) : null)
  }, [])

  useEffect(() => {
    window.localStorage.setItem("authData", JSON.stringify(auth))
  }, [auth])

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}
