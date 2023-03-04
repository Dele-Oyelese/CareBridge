import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import {Notification} from "./pages/Notification";
import {Update} from "./pages/update";

function App() {
  return (
      <>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/notifications' element={<Notification/>}/>
            <Route path='/update' element={<Update />}></Route>
          </Routes>
        </Router>
      </>
  )}

export default App;
