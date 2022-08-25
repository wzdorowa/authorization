// import { useState } from 'react';
import {
  Routes, Route, Link,
} from 'react-router-dom';
import styled from 'styled-components';
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
  // const [isAuth, setIsAuth] = useState<boolean>(false);

  const handleChangeIsAuth = (value: boolean) => {
    console.log('value', value);
    // setIsAuth(value);
  };

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
      {/* <Navigate to="/profile" /> */}
      {/* {!isAuth && (
        <Navigate to="/login" />
      )} */}
      <Routes>
        <Route path="/login" element={<Login handleChangeIsAuth={handleChangeIsAuth} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </StyledApp>
  );
}

export default App;
