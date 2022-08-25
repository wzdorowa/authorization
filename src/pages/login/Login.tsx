import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Checkbox from '../../components/Checkbox/Checkbox';

const StyledForm = styled.form`
max-width: 640px;
width: 90%;
display: flex;
flex-direction: column;
justify-content: space-between;
margin: 0 auto;
`;

const StyledInput = styled.input`
height: 60px;
width: 100%;
background-color: #F5F5F5;
border: none;
border-radius: 8px;
margin-top: 10px;
padding: 20px;
`;

const StyledLabel = styled.label`
display: flex;
flex-direction: column;
align-items: start;
`;

const StyledButton = styled.button`
height: 60px;
width: 100%;
border: none;
border-radius: 8px;
background-color: #4A67FF;
margin-top: 40px;
`;

const StyledCheckbox = styled.div`
margin-top: 20px;
`;

function Login() {
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data: unknown) => {
    console.log('data', JSON.stringify(data));
  };

  return (
    <StyledForm className="form-login" onSubmit={handleSubmit(onSubmit)}>
      <StyledLabel>
        <span>Логин</span>
        <StyledInput type="email" placeholder="email" {...register('login')} />
      </StyledLabel>
      <StyledLabel>
        <span>Пароль</span>
        <StyledInput type="password" placeholder="password" {...register('password')} />
      </StyledLabel>
      <StyledCheckbox>
        <Checkbox name="remember-password" isChecked>Запомнить пароль</Checkbox>
      </StyledCheckbox>
      <StyledButton type="submit">Войти</StyledButton>
    </StyledForm>
  );
}

export default Login;
