import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Notification } from "./pages/Notification/Notification";

import Summary from "./pages/Summary";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/notifications' element={<Notification />} />
          <Route path='/summary' element={<Summary />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
