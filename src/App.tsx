import './App.scss';
import Home from './pages/home';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import MyFlights from './pages/my-flights';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/my-reservations" element={<MyFlights />}></Route>
          {/* default redirect to home page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
