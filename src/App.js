import React from "react";
import "./App.css";


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



import Mapa from "./components/Mapa";
import Login from "./components/Login";


function App() {
  return (
    <Router>
      <Switch>
      
      <Route path="/mapa">
          <Mapa />;
        </Route>  
        <Route path="/">
          <Login />
        </Route>
        
      </Switch>
    </Router>
  );
}

export default App;
