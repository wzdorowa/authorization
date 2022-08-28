import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import isObject from '../../api/isObject';
import Checkbox from '../../components/Checkbox/Checkbox';
import auth from '../../api/Auth';
import Error from '../../components/Error/Error';
import InputWrapper from '../../components/InputWrapper/InputWrapper';

type LoginData = {
  login: string,
  password: string,
  isRemember: boolean,
};

const StyledForm = styled.form`
max-width: 640px;
width: 90%;
min-height: 335px;
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
color: #232323;

&.error {
  border: 1px solid #E26F6F;
  &:focus {
    outline: #E26F6F;
  }
}
`;

const StyledButton = styled.button`
height: 60px;
width: 100%;
border: none;
border-radius: 8px;
background-color: #4A67FF;
margin-top: 40px;
font-size: 18px;
font-weight: 700;
color: white;
cursor: pointer;

:disabled {
  background-color: #99A9FF;
  cursor: auto;
}
`;

function Login() {
  const {
    register,
    formState: {
      errors, isSubmitting,
    },
    handleSubmit,
    setFocus,
    setError,
  } = useForm<LoginData>();
  const [isRemember, setIsRemember] = useState<boolean>(true);
  register('isRemember', { value: true });

  useEffect(() => {
    if (errors.login) {
      setFocus('login');
      return;
    }
    if (errors.password) {
      setFocus('password');
    }
  }, [errors]);

  useEffect(() => {
    register('isRemember', { value: isRemember });
  }, [isRemember]);

  const onSubmit = async (values: LoginData) => {
    try {
      await auth.login(values);
    } catch (error) {
      if (isObject(error)) {
        if ('message' in error && typeof error.message === 'string') {
          setError('login', { type: 'apiError', message: error.message });
        }
      }
    }
  };

  return (
    <StyledForm className="form-login" onSubmit={handleSubmit(onSubmit)}>
      {errors.login?.type === 'apiError' && (
        <Error message={errors.login.message} />
      )}
      <InputWrapper
        title="Логин"
        isError={errors.login !== undefined && errors.login?.type !== 'apiError'}
      >
        <StyledInput className={errors.login && errors.login?.type !== 'apiError' ? 'error' : undefined} type="email" placeholder="email" {...register('login', { required: true })} />
      </InputWrapper>
      <InputWrapper
        title="Пароль"
        isError={errors.password !== undefined}
      >
        <StyledInput className={errors.password ? 'error' : undefined} type="password" placeholder="password" {...register('password', { required: true })} />
      </InputWrapper>
      <Checkbox name="remember-password" onChange={setIsRemember} isChecked={isRemember}>Запомнить пароль</Checkbox>
      <StyledButton type="submit" disabled={isSubmitting}>Войти</StyledButton>
    </StyledForm>
  );
}

export default Login;
