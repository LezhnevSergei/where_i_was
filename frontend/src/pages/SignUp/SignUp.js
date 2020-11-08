import React from 'react';
import {responseFacebook} from "../../api";
import FbLogin from "react-facebook-login";
import {useHistory} from 'react-router-dom'
import './SignUp.css'

const SignUp = () => {
  const history = useHistory()

  return (
    <div className='signup'>
      <div className="signup__logo">Impressions</div>
      <p className='signup__about'>
        Веб-приложение, с помощью которого люди смогут хранить свои впечатления о посещаемых местах
      </p>
      <FbLogin
        appId='449514096031890'
        field='name,email,picture'
        callback={(res) => {
          responseFacebook(res).then(() => {
            history.go(0)
          })
        }}
        style={{
          width: '100px'
        }}
        textButton='Войти с помощью Facebook'
      />
    </div>
  );
};

export default SignUp;