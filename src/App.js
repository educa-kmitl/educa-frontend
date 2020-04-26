import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { routes, PrivateRoute } from './routes'
import { Navbar, Loading } from './components'

export const App = () => {

  return (
    <div className="App">
<<<<<<< HEAD
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Navbar />
=======
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<Loading />}>
>>>>>>> 4102e9f91049040aa483958e2e8a65ec117b8329
          <Switch>
            {routes.map((route, index) =>
              route.requireAuth ?
                <PrivateRoute {...route} key={index} /> :
                <Route {...route} key={index} />
            )}
          </Switch>
<<<<<<< HEAD
        </BrowserRouter>
      </Suspense>
=======
        </Suspense>
      </BrowserRouter>
>>>>>>> 4102e9f91049040aa483958e2e8a65ec117b8329
    </div>
  );
}
