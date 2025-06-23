import React from 'react';
import libraryImage from '../assets/library.jpg'; // You need to place an image in `src/assets/`
import bookImage from '../assets/book-shelf.jpg';
import userImage from '../assets/user-manage.jpg';

function HomePage() {
  const styles = {
    container: {
      padding: '30px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    bannerImage: {
      width: '100%',
      height: '300px',
      objectFit: 'cover',
      borderRadius: '10px',
      marginBottom: '40px',
    },
    sectionTitle: {
      fontSize: '24px',
      marginBottom: '20px',
    },
    features: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '20px',
      marginBottom: '40px',
    },
    card: {
      flex: 1,
      backgroundColor: '#f4f4f4',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    cardImage: {
      width: '100%',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginBottom: '15px',
    },
    footer: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#0a3d62',
      color: '#ffffff',
      borderRadius: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Welcome to the Library Management System</h1>
        <p>Manage books, users, and borrowing activities easily.</p>
      </div>

      <img src={libraryImage} alt="Library Banner" style={styles.bannerImage} />

      <h2 style={styles.sectionTitle}>Features</h2>
      <div style={styles.features}>
        <div style={styles.card}>
          <img src={bookImage} alt="Books" style={styles.cardImage} />
          <h3>Book Management</h3>
          <p>Add, update, and manage all books in your library.</p>
        </div>
        <div style={styles.card}>
          <img src={userImage} alt="Users" style={styles.cardImage} />
          <h3>User Management</h3>
          <p>Register, login, and manage library users with roles.</p>
        </div>
        <div style={styles.card}>
          <img src={libraryImage} alt="Borrowing" style={styles.cardImage} />
          <h3>Borrow & Return</h3>
          <p>Track who borrowed which books and manage returns.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

