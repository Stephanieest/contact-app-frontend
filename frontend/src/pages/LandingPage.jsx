import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to the Contacts App</h1>
      <p>Store, organize, and manage your contacts efficiently.</p>
      <div>
        <Link to="/add" style={{ margin: '10px', padding: '10px', border: '1px solid #000', textDecoration: 'none' }}>Add Contact</Link>
        <Link to="/favourites" style={{ margin: '10px', padding: '10px', border: '1px solid #000', textDecoration: 'none' }}>View Favourites</Link>
        <Link to="/contacts" style={{ margin: '10px', padding: '10px', border: '1px solid #000', textDecoration: 'none' }}>View Contacts</Link>
      </div>
    </div>
  );
}

export default LandingPage;