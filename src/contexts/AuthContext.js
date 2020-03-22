import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ loading: true, data: null })

  useEffect(() => {
    setAuth({ loading: false, data: JSON.parse(window.localStorage.getItem("authData")) })
  }, [])

  useEffect(() => {
    window.localStorage.setItem("authData", JSON.stringify(auth.data))
  }, [auth.data])

  // a function that will help us to add the user data in the auth;

  return <AuthContext.Provider value={[ auth, setAuth ]}>{children}</AuthContext.Provider>
}
