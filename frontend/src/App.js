import logo from './logo.svg';
import './App.css';

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
