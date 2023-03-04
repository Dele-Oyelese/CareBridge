import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Summary from "./pages/Summary";
import Updates from "./pages/Updates";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/updates' element={<Updates />} />
          <Route exact path='/login' element={<Login />} />
          <Route path='/summary' element={<Summary />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
