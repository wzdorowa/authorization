import { useForm } from 'react-hook-form';
import { useEffect, useState, useMemo } from 'react';
import { Observable, ReplaySubject } from 'rxjs';
import styled from 'styled-components';
import useStream from '../../api/useStream';
import isObject from '../../api/isObject';
import Checkbox from '../../components/Checkbox/Checkbox';
import auth from '../../api/UserVerification';

type LoginType = {
  stream$: ReplaySubject<unknown> | Observable<number>,
  handleChangeIsAuth: (value: string) => void
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
  const { stream$, handleChangeIsAuth } = props;
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    setFocus,
  } = useForm();
  const [user, error, isLoading] = useStream(useMemo(() => stream$, []));
  const [login, setLogin] = useState<string>();

  useEffect(() => {
    if (errors?.password) {
      setFocus('password');
    }
    if (errors?.login) {
      setFocus('login');
    }
  }, [errors]);

  const onSubmit = (values: unknown) => {
    auth.checkUser(JSON.stringify(values));
    setLogin(JSON.parse(JSON.stringify(values)).login);
  };

  const onChangeCheckbox = (value: boolean) => {
    register('isRemember', { value });
  };

  if (typeof user === 'string') {
    handleChangeIsAuth(user);
  }

  return (
    <StyledForm className="form-login" onSubmit={handleSubmit(onSubmit)}>
      {isObject(error) && (
      <StyledErrorDiv>
        <p>
          Пользователя
          {' '}
          {login}
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
