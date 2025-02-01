import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div id="landing-container">
      <header id="landing-header">
        <h1>Welcome to the Contact App</h1>
        <p>Manage your contacts and favorites with ease.</p>
        <Link id="landing-button" to="/users">Get Started</Link>
      </header>
      <section id="landing-features">
        <div className="feature">
          <h2>Easy to Use</h2>
          <p>Our app is designed to be user-friendly and intuitive.</p>
        </div>
        <div className="feature">
          <h2>Secure</h2>
          <p>Your data is safe and secure with us.</p>
        </div>
        <div className="feature">
          <h2>Customizable</h2>
          <p>Customize your contact list and favorites as you like.</p>
        </div>
      </section>
      <footer id="landing-footer">
        <p>&copy; 2025 Contact App. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
