import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { routes, PrivateRoute } from './routes'
import { Navbar, Loading } from './components'

export const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Switch>
            {routes.map((route, index) =>
              route.requireAuth ?
                <PrivateRoute {...route} key={index} /> :
                <Route {...route} key={index} />
            )}
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
