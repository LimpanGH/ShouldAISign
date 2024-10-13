import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

const Navbar: React.FC = () => {
    return (
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">Should I Sign</Link>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/eula-checker">Eula Checker</Link>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Navbar;