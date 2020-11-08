import React from 'react';
import './Header.css'
import {logOut} from "../../api";
import {Link, useHistory} from 'react-router-dom'

const Header = ({user}) => {
  const history = useHistory()

  return (
    <header className='header'>
      <Link
        to={'/'}
        className="logo"
      >
        Impressions
      </Link>
      <div className="user">
        <img className='user_img' src={user?.extra_data.picture.data.url} alt="Аватар пользователя"/>
        <div className="user_name">{user?.user.username}</div>
      </div>
      <div
        className="login"
        onClick={() => {
          logOut().then(() => {
            history.go(0)
          })
        }}
      >
        Выйти
      </div>
    </header>
  );
};

export default Header;