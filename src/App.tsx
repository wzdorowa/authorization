import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <Link
          className="App__header-link"
          to="/"
        >
          ONLY.
        </Link>
      </header>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
