import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar, PrivateRoute } from './components';
import { Start, Home, Create, Ranking, Room, Profile, Login, SignUp, NotFound } from './pages';


export const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Switch>

          <Route exact path="/" component={Start} />

          <PrivateRoute path="/home" component={Home} />

          <PrivateRoute path="/ranking" component={Ranking} />

          <PrivateRoute path="/create" component={Create} />

          <PrivateRoute path="/room" component={Room} />

          <PrivateRoute path="/profile" component={Profile} />

          <Route path="/login" component={Login} />

          <Route path="/signup" component={SignUp} />

          <Route path="/" component={NotFound} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}
