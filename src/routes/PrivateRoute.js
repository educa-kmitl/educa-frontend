import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../contexts'

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={() =>
        auth ?
          <Component /> :
          <Redirect to="/login" />
      }
    />
  )
}