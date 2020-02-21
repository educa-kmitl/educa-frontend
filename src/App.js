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
            () => <Learn user={user}/>
          }/>

          <Route path="/teach" render={
            () => <Teach user={user}/>
          }/>
            
          <Route path="/search" component={Search}/>

          <Route path="/room" component={Room}/>

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
