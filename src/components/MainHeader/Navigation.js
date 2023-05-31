import React, { useContext } from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../../store/auth-context';

const Navigation = () => {

  const ctx = useContext(AuthContext); // 컨텍스트 한테 포인터 전달. 

  return (
      <nav className={classes.nav}>
        <ul>
          {ctx.isLoggedIn && (
            <li>
              <a href="/">Users</a>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <a href="/">Admin</a>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <button onClick={ctx.onLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>  
      
  );
};

export default Navigation;
