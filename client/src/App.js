import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import './App.css';

import NavBar from './NavBar';
import Home from './Main/Home';
import LogIn from './Main/LogIn';
import Register from './Main/Register';
import UserDashboard from './Users/Dashboard';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth='sm'>
        <NavBar />
        <Routes>
          <Route extact path='/' element={<Home />} />
          <Route extact path='/login' element={<LogIn />} />
          <Route extact path='/register' element={<Register />} />
          <Route extact path='/dashboard' element={<UserDashboard />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
