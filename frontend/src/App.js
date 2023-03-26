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
          <Route exact path='/CareBridge' element={<Home />} />
          <Route exact path='/CareBridge/updates' element={<Updates />} />
          <Route exact path='/CareBridge/login' element={<Login />} />
          <Route exact path='/CareBridge/summary' element={<Summary />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
