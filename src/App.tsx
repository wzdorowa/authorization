import { useEffect, useMemo } from 'react';
import {
  Routes, Route, Link, useNavigate,
} from 'react-router-dom';
import styled from 'styled-components';
import useStream from './api/useStream';
import auth from './api/UserVerification';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';

const StyledApp = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
`;

const StyledHeader = styled.header`
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
`;

const StyledLink = {
  textDecoration: 'none',
};

const StyledLogo = styled.h1`
font-size: 64px;
line-height: 78.14px;
font-weight: 700;
color: black;
margin: 40px;
`;

function App() {
  const navigate = useNavigate();
  const stream$ = auth.getUserData();
  const [user, error, isLoading] = useStream(useMemo(() => stream$, []), auth.getUserLogin());
  console.log('user', user);

  const goLogin = () => navigate('/login');
  const goProfile = () => navigate('/profile', { state: user });

  useEffect(() => {
    if (user) {
      goProfile();
    }
    if (!user) {
      goLogin();
    }
  }, [user]);

  return (
    <StyledApp className="App">
      <StyledHeader>
        <Link
          style={StyledLink}
          to="/"
        >
          <StyledLogo>ONLY.</StyledLogo>
        </Link>
      </StyledHeader>
      <Routes>
        <Route path="/login" element={<Login error={error} isLoading={isLoading} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </StyledApp>
  );
}

export default App;
