import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <h2 style={styles.logo}>📚 Library System</h2>
      </div>
      
      <div style={styles.center}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/books" style={styles.link}>Books</Link>
      </div>

      <div style={styles.right}>
        <Link to="/login" style={{ ...styles.button, backgroundColor: '#60a3bc' }}>Sign In</Link>
        <Link to="/register" style={{ ...styles.button, backgroundColor: '#3c6382' }}>Sign Up</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#0a3d62',
    color: 'white'
  },
  left: {
    flex: 1
  },
  center: {
    flex: 1,
    textAlign: 'center'
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px'
  },
  logo: {
    margin: 0
  },
  link: {
    margin: '0 10px',
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold'
  },
  button: {
    padding: '8px 16px',
    color: 'white',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
  }
};

export default Navbar;
