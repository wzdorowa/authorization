import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import './App.css';

const StyledHeader = styled.h1`
font-size: 64px;
font-weight: 700;
`;

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <Link
          className="App__header-link"
          to="/"
        >
          <StyledHeader>ONLY.</StyledHeader>
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