import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Checkbox from '../../components/Checkbox/Checkbox';
import userAuth from '../../api/UserVerification';

type LoginType = {
  handleChangeIsAuth: (value: boolean) => void
};

const StyledForm = styled.form`
max-width: 640px;
width: 90%;
min-height: 365px;
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

&.error {
  border: 1px solid #E26F6F;
  &:focus {
    outline: #E26F6F;
  }
}
`;

const StyledLabel = styled.label`
display: flex;
flex-direction: column;
align-items: start;
`;

const StyledErrorText = styled.p`
font-size: 14px;
color: #E26F6F;
margin: 8px 0 20px 0;
`;

const StyledErrorDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
width: 100%;
height: 60px;
background-color: #F5E9E9;
border: 1px solid #E26F6F;
border-radius: 8px;
margin-bottom: 27px;
`;

const StyledButton = styled.button`
height: 60px;
width: 100%;
border: none;
border-radius: 8px;
background-color: #4A67FF;
margin-top: 40px;
cursor: pointer;

:disabled {
  background-color: #99A9FF;
  cursor: auto;
}
`;

function Login(props: LoginType) {
  const { handleChangeIsAuth } = props;
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    setFocus,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [notValidUser, setNotValidUser] = useState<string | null>(null);

  useEffect(() => {
    if (errors?.password) {
      setFocus('password');
    }
    if (errors?.login) {
      setFocus('login');
    }
  }, [errors]);

  const onSubmit = (data: unknown) => {
    setIsLoading(true);
    setNotValidUser(null);
    setTimeout(() => {
      console.log('data', JSON.stringify(data));
      const user = userAuth.checkUser(JSON.stringify(data));
      setIsLoading(false);
      if (user) {
        handleChangeIsAuth(true);
      }
      if (!user) {
        setNotValidUser(JSON.parse((JSON.stringify(data))).login);
      }
    }, 2000);
  };

  const onChangeCheckbox = (value: boolean) => {
    register('checkbox', { value });
  };

  return (
    <StyledForm className="form-login" onSubmit={handleSubmit(onSubmit)}>
      {notValidUser && (
      <StyledErrorDiv>
        <p>
          Пользователя
          {' '}
          {notValidUser}
          {' '}
          не существует
        </p>
      </StyledErrorDiv>
      )}
      <StyledLabel>
        <span>Логин</span>
        {errors?.login && (
          <>
            <StyledInput className="error" type="email" placeholder="email" {...register('login', { required: true })} />
            <StyledErrorText>Обязательное поле</StyledErrorText>
          </>
        )}
        {errors?.login === undefined && <StyledInput type="email" placeholder="email" {...register('login', { required: true })} />}
      </StyledLabel>
      <StyledLabel>
        <span>Пароль</span>
        {errors?.password && (
          <>
            <StyledInput className="error" type="password" placeholder="password" {...register('password', { required: true })} />
            <StyledErrorText>Обязательное поле</StyledErrorText>
          </>
        )}
        {errors?.password === undefined && <StyledInput type="password" placeholder="password" {...register('password', { required: true })} />}
      </StyledLabel>
      <Checkbox name="remember-password" onChange={onChangeCheckbox} isChecked>Запомнить пароль</Checkbox>
      <StyledButton type="submit" disabled={isLoading}>Войти</StyledButton>
    </StyledForm>
  );
}

export default Login;
