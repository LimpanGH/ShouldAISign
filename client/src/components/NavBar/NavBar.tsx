import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../helpers/AutContext'; // Import useAuth
import classes from './NavBar.module.css';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth(); // Access auth state and logout
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={classes['navbar-container']} ref={navbarRef}>
      <div className={classes['navbar-logo']}>
        <Link to="/">ShouldAISign</Link>
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
            to="/"
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
            to="/eula-checker"
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
            to="/about"
            className={({ isActive }) =>
              isActive ? classes['active-link'] : classes['inactive-link']
            }
            onClick={toggleMenu}
          >
            About Me
          </NavLink>
        </li>
        {!isAuthenticated ? (
          <li>
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                isActive ? classes['active-link'] : classes['inactive-link']
              }
              onClick={toggleMenu}
            >
              Sign In
            </NavLink>
          </li>
        ) : (
          <li>
            <button onClick={logout} className={classes['signout-button']}>
              Sign Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
