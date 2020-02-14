import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar, ToggleButton, Button, Dropdown, Input, Card } from './components';
import { Home, Learn, Teach, Search  } from './pages';
import './App.scss';

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={{name: 'prayut007', level: 69}}/>
        
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/learn">
            <Learn />
            <ToggleButton on="Private" off="Public"/>
            <br />
            <Button text="Get Started"/>
            <br />
            <Button alt text="Login"/>
            <br />
            <Dropdown subjects={['Math', 'Science', 'Art', 'English']}/>
            <br />
            <Input text="username" type="text" size="400px"/>
            <br />
            <Input alt text="password" type="password" size="400px"/>
            <br />
            <Card/>

          </Route>

          <Route path="/teach">
            <Teach />
          </Route>

          <Route path="/search">
            <Search />
          </Route>
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}
