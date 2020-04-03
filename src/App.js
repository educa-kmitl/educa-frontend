import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { routes, PrivateRoute } from './routes'
import { Navbar, Loading } from './components'

export const App = () => {

  return (
    <div className="App">
      <Suspense fallback={Loading}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            {routes.map(route =>
              route.requireAuth ?
                <PrivateRoute {...route} /> :
                <Route {...route} />
            )}
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}
