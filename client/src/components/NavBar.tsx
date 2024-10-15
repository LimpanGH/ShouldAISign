import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../css/NavBar.module.css';

const Navbar: React.FC = () => {
  const jwtToken = 'token';
  
  function signOut() {
    const token = localStorage.getItem(jwtToken);
    if (!token) {
      alert('No user is currently signed in');
      return;
    }

    localStorage.removeItem(jwtToken);
    alert('Sucessfully signed out');
    window.location.href = '/signin';
  }

  return (
    <nav className={classes['navbar-container']}>
      <div className={classes['navbar-logo']}>
        <Link to='/'>
          <img src='../src/assets/logo.svg' alt='logo' />
        </Link>
        <Link to='/'>ShouldAISign</Link>
      </div>

      <ul className={classes['navbar-links']}>
       

        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/signup'>Sign Up</Link>
        </li>
        <li>
          <Link to='/signin'>Sign In</Link>
        </li>
        <li>
          <Link to='/contact'>Contact</Link>
        </li>
        <li>
          <Link to='/eula-checker'>Eula Checker</Link>
        </li>
        <li>
          <button onClick={signOut} className={classes['signout-button']}>
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
