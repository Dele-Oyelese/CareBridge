import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

import Summary from './pages/Summary';
function App() {
  return (
   <>
   <Router>
      <Routes>
      <Route  path='/' element={<Home/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route  path='/summary' element={<Summary/>}/>
      </Routes>
    </Router>
   </>
  )} 
  export default App;
