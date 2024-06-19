import { useForm } from 'react-hook-form';
import './RegisterForm.css';
import { useState, useRef, useContext } from 'react';
import { postRegister } from '../../services/post';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserContext from '../../Context/UserContext/UserContext';
import TextField from '@mui/material/TextField';

const RegisterForm = () => {
  const [error, setError] = useState('');
  const { setUpdate } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const password = useRef({});
  password.current = watch('password', '');
  const navigate = useNavigate();

  const formSubmitHandler = async (data) => {
    try {
      const dataCopy = { ...data };
      delete dataCopy['repeatPassword'];
      await postRegister(dataCopy);
      setUpdate((updates) => updates + 1);
      reset();
      toast.success('User created successfully!');
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} noValidate className='register-form'>
      <TextField
        sx={{
          '& :-webkit-autofill': {
            transitionDelay: '9999s',
          },
        }}
        className='test-input'
        required
        id='userName'
        label='User name'
        size='small'
        variant='standard'
        {...register('userName', {
          required: 'User name is required',
          validate: (value) => value.trim() !== '' || 'User name cannot be empty',
        })}
      />
      {errors.userName && <div className='error'>{errors.userName.message}</div>}
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
          validate: (value) => value.length >= 8 || 'Password must have at least 8 characters',
        })}
      />
      {errors.password && <div className='error'>{errors.password.message}</div>}
      <TextField
        sx={{
          '& :-webkit-autofill': {
            transitionDelay: '9999s',
          },
        }}
        id='repeatPassword'
        required
        label='Repeat Password'
        type='password'
        size='small'
        variant='standard'
        {...register('repeatPassword', {
          required: 'Repeat your password',
          validate: (value) => value === password.current || 'Passwords do not match',
        })}
      />
      {errors.repeatPassword && <div className='error'>{errors.repeatPassword.message}</div>}

      {error && <div className='error'>{error}</div>}

      <input className='submit-btn' type='submit' value='Submit' />
      <div className='already'>
        <span>
          Already have an account?{' '}
          <NavLink to='/login' className={'nav-login'}>
            Login!
          </NavLink>
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;
