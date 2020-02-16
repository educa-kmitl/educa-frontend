import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar, Card } from './components';
import { Home, Learn, Teach, Search, Room, Join  } from './pages';
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

          <Route exact path="/" component={Home}/>

          <Route path="/learn">
            <Learn />
            <Card />
          </Route>

          <Route path="/teach" render={
            (props) => <Teach {...props} user={user}/>
          }/>
            
          <Route path="/search" component={Search}/>

          <Route path="/room" render={
            (props) => <Room {...props}/>
          }/>

          <Route path="/join" component={Join}/> {/* Remove later */}
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}
