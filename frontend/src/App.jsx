import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UserForm from "./components/UserForm";
import ContactForm from "./components/ContactForm";
import FavoriteForm from "./components/FavoriteForm";
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa' }}>
          <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/contacts">Contacts</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
          </ul>
        </nav>
        <div className="main-content" style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/users" element={<UserForm />} />
            <Route path="/contacts" element={<ContactForm />} />
            <Route path="/favorites" element={<FavoriteForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;