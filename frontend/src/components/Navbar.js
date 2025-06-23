import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>📚 Library System</h2>
      <div>
        <Link to="/login" style={styles.link}>Sign In</Link>
        <Link to="/register" style={styles.link}>Sign Up</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 30px',
    backgroundColor: '#0a3d62',
    color: 'white',
    alignItems: 'center'
  },
  logo: {
    margin: 0
  },
  link: {
    marginLeft: '20px',
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold'
  }
};

export default Navbar;
