import './App.css';
import React, {useEffect, useState} from "react";
import Impressions from "./pages/Impressions/Impressions";
import Header from "./components/Header/Header";
import NewImpression from "./pages/NewImpression/NewImpression";
import {Route, Switch} from "react-router-dom";
import {getUser} from "./api";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  const [userData, setUserData] = useState(null)
  const [needAuth, setNeedAuth] = useState(null)
  const access_token = localStorage.getItem('access_token')
  useEffect(() => {
    getUser(access_token).then(res => {
      setUserData(res)
      setNeedAuth(false)
    }).catch(() => {
      setNeedAuth(true)
    })
  }, [access_token])

  return (
    <div className="App container">
      {
        needAuth && (
          <Route path={''} component={SignUp}/>
        )
      }
      {
        userData && (
          <>
            <Header user={userData}/>
            <Switch>
              <Route path={'/add_impression'}
                     component={() => <NewImpression user={userData}/>}/>
              <Route path={''}
                     component={() => <Impressions user={userData}/>}/>
            </Switch>
          </>
        )
      }
    </div>
  );
}

export default App;
