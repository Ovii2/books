import { useForm } from 'react-hook-form';
import { useState, useRef, useContext } from 'react';
import { postCategory } from '../../services/post';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserContext from '../../Context/UserContext/UserContext';
import TextField from '@mui/material/TextField';

import './CategoriesForm.css';
import CategoriesContext from '../../Context/CategoriesContext/CategoriesContext';

const CategoriesForm = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState('');
  // const { setUpdate, setCategories } = useContext(UserContext);
  const { setUpdate, setCategories } = useContext(CategoriesContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  // const navigate = useNavigate();

  const formSubmitHandler = async (data) => {
    try {
      const response = await postCategory(data);
      console.log(response);

      setUpdate((update) => update + 1);
      setIsFormOpen(false);
      reset();
      //   navigate('/books');
      toast.success('Category added!');
    } catch (error) {
      setError(error.message);
      toast.error('Error adding category');
    }
  };

  return (
    <div className='categories-form-container'>
      <button className='categories-btn' onClick={() => setIsFormOpen(!isFormOpen)}>
        +Add category
      </button>
      {isFormOpen && (
        <form className='categories-form' noValidate onSubmit={handleSubmit(formSubmitHandler)}>
          <TextField
            required
            id='title'
            label='Title'
            placeholder='Add title'
            {...register('title', {
              required: { value: true, message: 'Title is required' },
            })}
          />
          {errors.title && <div className='error'>{errors.title.message}</div>}
          <TextField
            required
            id='description'
            label='Description'
            multiline
            rows={4}
            placeholder='Add description'
            {...register('description', {
              required: { value: true, message: 'Description is required' },
            })}
          />
          {errors.description && <div className='error'>{errors.description.message}</div>}
          <button type='submit' className='categories-btn'>
            Add
          </button>
        </form>
      )}
    </div>
  );
};

export default CategoriesForm;
