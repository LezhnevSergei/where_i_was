import React from 'react';
import './Header.css'

const Header = () => {
  return (
    <header className='header'>
      <div className="logo">Impressions</div>
      <div
        className="login"
      >
        Войти
      </div>
    </header>
  );
};

export default Header;