import styled from 'styled-components';

const StyledLabel = styled.label`
display: flex;
flex-direction: column;
align-items: start;
margin-bottom: 20px;
`;

const StyledErrorText = styled.p`
font-size: 14px;
color: #E26F6F;
margin: 8px 0 0 0;
`;

type InputWrapperData = {
  children: JSX.Element,
  isError: boolean,
  title: string,
};

function InputWrapper(props : InputWrapperData) {
  const { children, isError, title } = props;
  return (
    <StyledLabel>
      <span>{title}</span>
      {children}
      {isError && <StyledErrorText>Обязательное поле</StyledErrorText>}
    </StyledLabel>
  );
}

export default InputWrapper;
