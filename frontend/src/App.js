import './App.css';
import React from "react";
import Impressions from "./pages/Impressions/Impressions";
import Header from "./components/Header/Header";
import NewImpression from "./pages/NewImpression/NewImpression";
import {Route, Switch} from "react-router-dom";

function App() {
  return (
    <div className="App container">
      <Header/>
      <Switch>
        <Route path={'/add_impression'} component={NewImpression}/>
        <Route path={''} component={Impressions}/>
      </Switch>

    </div>
  );
}

export default App;
