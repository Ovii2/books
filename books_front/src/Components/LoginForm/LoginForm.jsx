import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate, NavLink } from 'react-router-dom';
import { loginPost } from '../../services/post';
import TextField from '@mui/material/TextField';

import './LoginForm.css';

const LoginForm = () => {
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const formSubmitHandler = async (data) => {
    try {
      const response = await loginPost(data);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response));
      reset();
      navigate('/books');
      toast.success('Login successfull!');
    } catch (error) {
      setError(error.message);
      toast.error('Invalid email or password');
    }
  };

  return (
    <form className='login-form' noValidate onSubmit={handleSubmit(formSubmitHandler)}>
      <TextField
        sx={{
          '& :-webkit-autofill': {
            transitionDelay: '9999s',
          },
        }}
        required
        id='email'
        label='Email'
        size='small'
        variant='standard'
        {...register('email', {
          required: 'Email is required',
          validate: (value) => value.trim() !== '' || 'Email cannot be empty',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address format',
          },
        })}
      />
      {errors.email && <div className='error'>{errors.email.message}</div>}
      <TextField
        sx={{
          '& :-webkit-autofill': {
            transitionDelay: '9999s',
          },
        }}
        id='password'
        required
        label='Password'
        type='password'
        size='small'
        variant='standard'
        {...register('password', {
          required: 'Password is required',
          // validate: (value) => {
          //   return value.length < 8 && 'Password must have at least 8 characters';
          // },
        })}
      />
      {errors.password && <div className='error'>{errors.password.message}</div>}

      <input className='login-btn' type='submit' value='Login' />
      <div className='new-user'>
        <span>
          New user?
          <NavLink to='/register' className={'nav-register'}>
            {' '}
            Create an account!
          </NavLink>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
