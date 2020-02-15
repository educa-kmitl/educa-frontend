import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar, Card } from './components';
import { Home, Learn, Teach, Search, Room  } from './pages';
import './App.scss';

const user = {
  name: 'prayut007',
  level: 44
}

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user}/>
        
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/learn">
            <Learn />
            <Card/>
          </Route>

          <Route path="/teach">
            <Teach user={user}/>
          </Route>

          <Route path="/search">
            <Search />
          </Route>

          <Route path="/room">
            <Room />
          </Route>
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}
