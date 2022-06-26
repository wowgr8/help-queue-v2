import React from "react";
import Header from "./Header";
import TicketControl from "./TicketControl";
import Signin from "./Signin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; // The as syntax just makes the naming a little easier - we can call the component <Router> instead of <BrowserRouter> and save a little typing. 

function App(){
  return ( 
    <Router>
      <Header />
      <Switch>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/">
          <TicketControl />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;