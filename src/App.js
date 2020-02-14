import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar, ToggleButton, Button, Dropdown,Card } from './components';
import { Home, Learn, Teach, Search  } from './pages';
import './App.scss';

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        
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
