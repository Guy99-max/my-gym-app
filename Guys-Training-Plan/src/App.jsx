import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Profile from './pages/Profile';
import Workout from './pages/Workout';
import './styles.css';

function App() {
  return (
    <Router>
      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Profile
        </NavLink>
        {' | '}
        <NavLink to="/workout" className={({ isActive }) => (isActive ? 'active' : '')}>
          Workout
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/workout" element={<Workout />} />
      </Routes>
    </Router>
  );
}

export default App;
