import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { toast } from 'react-toastify';
import './BooksForm.css';
import BooksContext from '../../Context/BooksContext/BooksContext';
import { postBook } from '../../services/post';
import { getCategories } from '../../services/get';
import CategoriesContext from '../../Context/CategoriesContext/CategoriesContext';
import { getUserRoleFromToken } from '../../utils/jwt';

const BooksForm = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState('');

  const { setUpdate, setBooks } = useContext(BooksContext);
  const { categories, setCategories } = useContext(CategoriesContext);

  const token = localStorage.getItem('token');
  const role = getUserRoleFromToken(token);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      isbn: '',
      image: '',
      pages: '',
      description: '',
      categoryId: '',
    },
  });

  const fetchCategories = async () => {
    if (role === 'ADMIN') {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        setError(error.message);
        toast.error('Error fetching categories');
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [setCategories, role]);

  const formSubmitHandler = async (data) => {
    console.log(data);
    try {
      const response = await postBook(data);

      console.log(response);
      setUpdate((update) => update + 1);
      setIsFormOpen(false);
      reset();
      toast.success('Book added!');
    } catch (error) {
      setError(error.message);
      toast.error('Error adding book');
    }
  };

  return (
    <div className='books-form-container'>
      {role === 'ADMIN' && (
        <>
          <button className='books-btn' onClick={() => setIsFormOpen(!isFormOpen)}>
            +Add Book
          </button>
          {isFormOpen && (
            <form className='books-form' noValidate onSubmit={handleSubmit(formSubmitHandler)}>
              <FormControl fullWidth>
                <InputLabel required id='category-label'>
                  Category
                </InputLabel>
                <Select
                  required
                  labelId='category-label'
                  id='categoryId'
                  label='Category'
                  {...register('categoryId', {
                    required: { value: true, message: 'Category is required' },
                  })}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.category && <div className='error'>{errors.category.message}</div>}

              <TextField
                sx={{
                  '& :-webkit-autofill': {
                    transitionDelay: '9999s',
                  },
                }}
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
                sx={{
                  '& :-webkit-autofill': {
                    transitionDelay: '9999s',
                  },
                }}
                required
                id='isbn'
                label='Isbn'
                placeholder='Add isbn'
                {...register('isbn', {
                  required: { value: true, message: 'Isbn is required' },
                })}
              />
              {errors.isbn && <div className='error'>{errors.isbn.message}</div>}

              <TextField
                sx={{
                  '& :-webkit-autofill': {
                    transitionDelay: '9999s',
                  },
                }}
                required
                id='image'
                label='Image'
                placeholder='Add image'
                {...register('image', {
                  required: { value: true, message: 'Image is required' },
                })}
              />
              {errors.image && <div className='error'>{errors.image.message}</div>}

              <TextField
                sx={{
                  '& :-webkit-autofill': {
                    transitionDelay: '9999s',
                  },
                }}
                required
                id='pages'
                label='Pages'
                placeholder='Add pages'
                {...register('pages', {
                  required: { value: true, message: 'Pages is required' },
                })}
              />
              {errors.pages && <div className='error'>{errors.pages.message}</div>}

              <TextField
                sx={{
                  '& :-webkit-autofill': {
                    transitionDelay: '9999s',
                  },
                }}
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

              <button type='submit' className='books-btn'>
                Add
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default BooksForm;
