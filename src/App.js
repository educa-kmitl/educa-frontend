import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar } from './components';
import { Home, Learn, Teach, Search, Room, Join, Profile, Login, SignUp, NotFound  } from './pages';

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

          <Route path="/learn" render={
            (props) => <Learn {...props} user={user}/>
          }/>

          <Route path="/teach" render={
            (props) => <Teach {...props} user={user}/>
          }/>
            
          <Route path="/search" component={Search}/>

          <Route path="/room" render={
            (props) => <Room {...props}/>
          }/>

          <Route path="/join" component={Join}/> {/* Remove later */}

          <Route path="/profile" component={Profile}/>

          <Route path="/login" component={Login}/>

          <Route path="/signup" component={SignUp}/>

          <Route path="/" component={NotFound}/>
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}
