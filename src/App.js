import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Medication from "./Medication";
import Patients from "./Patients";

function App() {
  return (

      <div>

        <BrowserRouter>
          <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/patients' component={Patients}/>
              <Route path='/medication' component={Medication}/>
          </Switch>
        </BrowserRouter>

      </div>


  );
}

export default App;
