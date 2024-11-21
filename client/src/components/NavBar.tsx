// https://reactrouter.com/en/main/components/nav-link

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import classes from '../css/NavBar.module.css';
import logo from '../assets/logo.svg';

export const AUTH_EVENT = 'authStateChanged';

// Create a utility to manage auth state
export const AuthEvents = {
  emit: (isAuthenticated: boolean) => {
    const event = new CustomEvent(AUTH_EVENT, { detail: { isAuthenticated } });
    window.dispatchEvent(event);
  },
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const jwtToken = 'token';

  useEffect(() => {
    // Check initial authentication status
    const token = localStorage.getItem(jwtToken);
    setIsAuthenticated(!!token);

    // Listen for authentication state changes
    const handleAuthChange = (event: CustomEvent) => {
      setIsAuthenticated(event.detail.isAuthenticated);
    };

    // Add event listener
    window.addEventListener(AUTH_EVENT, handleAuthChange as EventListener);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener(AUTH_EVENT, handleAuthChange as EventListener);
    };
  }, []);

  function signOut() {
    const token = localStorage.getItem(jwtToken);
    if (!token) {
      alert('No user is currently signed in');
      return;
    }
    localStorage.removeItem(jwtToken);
    setIsAuthenticated(false);
    AuthEvents.emit(false);
    alert('Successfully signed out');
    window.location.href = '/';
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={classes['navbar-container']}>
      <div className={classes['navbar-logo']}>
        <NavLink to='/'>
          <img src={logo} alt='logo' />
        </NavLink>
        <Link to='/'>ShouldAISign</Link>
      </div>

      <div className={classes.hamburger} onClick={toggleMenu}>
        <span className={isMenuOpen ? classes['line-active'] : ''}></span>
        <span className={isMenuOpen ? classes['line-active'] : ''}></span>
        <span className={isMenuOpen ? classes['line-active'] : ''}></span>
      </div>

      <ul
        className={`${classes['navbar-links']} ${
          isMenuOpen ? classes['active'] : ''
        }`}
      >
        <li>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? classes['active-link'] : classes['inactive-link']
            }
            onClick={toggleMenu}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/eula-checker'
            className={({ isActive }) =>
              isActive ? classes['active-link'] : classes['inactive-link']
            }
            onClick={toggleMenu}
          >
            Eula Checker
          </NavLink>
        </li>
        
        <li>
          <NavLink
            to='/about'
            className={({ isActive }) =>
              isActive ? classes['active-link'] : classes['inactive-link']
            }
            onClick={toggleMenu}
          >
            About Me
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to='/contact'
            className={({ isActive }) =>
              isActive ? classes['active-link'] : classes['inactive-link']
            }
          >
            Contact
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink
            to='/cv-page'
            className={({ isActive }) =>
              isActive ? classes['active-link'] : classes['inactive-link']
            }
          >
            CV
          </NavLink>
        </li> */}

          <li>
          <NavLink
            to='/signIn'
            className={({ isActive }) =>
              isActive ? classes['active-link'] : classes['inactive-link']
            }
          >
            Sign In
          </NavLink>
        </li>
        
        {isAuthenticated && (
          <li>
            <button onClick={signOut} className={classes['signout-button']}>
              Sign Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
