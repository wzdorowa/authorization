import styled from 'styled-components';

const StyledContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
flex-grow: 1;
`;

const StyledText = styled.p`
font-size: 40px;
margin-bottom: 50px;
`;

const StyledTextBold = styled.span`
font-size: 40px;
font-weight: 700;
`;

const StyledButton = styled.button`
width: 200px;
height: 60px;
background-color: #F5F5F5;
border: none;
border-radius: 8px;
font-size: 18px;
font-weight: 700;
cursor: pointer;
`;

function Profile() {
  const user = 'test@gmail.com';
  return (
    <StyledContainer>
      <StyledText>
        Здравствуйте,
        {' '}
        <StyledTextBold>{user}</StyledTextBold>
      </StyledText>
      <StyledButton>Выйти</StyledButton>
    </StyledContainer>
  );
}

export default Profile;
