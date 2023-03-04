import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Update } from "./pages/update";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/update' element={<Update />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
