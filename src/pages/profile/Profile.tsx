import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import auth from '../../api/Auth';

const StyledContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
`;

const StyledTextContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
`;

const StyledText = styled.span`
font-size: 40px;
line-height: 48.84px;
`;

const StyledTextBold = styled.span`
font-size: 40px;
font-weight: 700;
line-height: 48.84px;
`;

const StyledButton = styled.button`
width: 200px;
height: 60px;
font-size: 18px;
font-weight: 700;
margin-top: 50px;
background-color: #F5F5F5;
border: none;
border-radius: 8px;
cursor: pointer;
`;

function Profile() {
  const navigate = useNavigate();
  const goLogin = () => navigate('/login');

  const location = useLocation();
  const user = location.state;

  const onLogout = () => {
    auth.logout();
  };

  if (typeof user !== 'string') {
    goLogin();
  }

  return (
    <StyledContainer>
      <StyledTextContainer>
        <StyledText>
          Здравствуйте, &thinsp;
        </StyledText>
        <StyledTextBold>{typeof user === 'string' && user}</StyledTextBold>
      </StyledTextContainer>
      <StyledButton onClick={onLogout}>Выйти</StyledButton>
    </StyledContainer>
  );
}

export default Profile;
