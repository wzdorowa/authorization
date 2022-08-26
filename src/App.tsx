import { useEffect, useState } from 'react';
import {
  Routes, Route, Link, useNavigate,
} from 'react-router-dom';
import styled from 'styled-components';
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
  const stream$ = auth.getUser();
  const user = auth.getUserLogin();
  const [authLogin, setAuthLogin] = useState<string>();

  const goLogin = () => navigate('/login');
  const goProfile = () => navigate('/profile', { state: authLogin });

  const handleChangeIsAuth = (value: string) => {
    setAuthLogin(value);
  };

  useEffect(() => {
    if (user) {
      setAuthLogin(user);
    }
    if (authLogin) {
      goProfile();
    }
    if (!authLogin) {
      goLogin();
    }
  }, [authLogin, user]);

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
        <Route path="/login" element={<Login stream$={stream$} handleChangeIsAuth={handleChangeIsAuth} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </StyledApp>
  );
}

export default App;
