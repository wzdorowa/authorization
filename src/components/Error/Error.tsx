import styled from 'styled-components';

const StyledErrorDiv = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
width: 100%;
height: 60px;
background-color: #F5E9E9;
border: 1px solid #E26F6F;
border-radius: 8px;
padding-left: 20px;
margin-bottom: 27px;
`;

const StyledErrorSign = styled.span`
display: inline-block;
width: 20px;
height: 20px;
margin-right: 14px;
&::before {
  content: '!';
  position: absolute;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  color: #EE6565;
  background-color: #FFC8C8;
  border-radius: 50%;
}
`;

function Error({ message }: { message: string | undefined }) {
  return (
    <StyledErrorDiv>
      <StyledErrorSign />
      <p>{ message }</p>
    </StyledErrorDiv>
  );
}

export default Error;
