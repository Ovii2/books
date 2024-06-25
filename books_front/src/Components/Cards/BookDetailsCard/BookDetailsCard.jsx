import { useContext, useEffect, useState } from 'react';
import { getOneBook } from '../../../services/get';
import BooksContext from '../../../Context/BooksContext/BooksContext';
import { toast } from 'react-toastify';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';

import './BookDetailsCard.css';
import { NavLink, useParams } from 'react-router-dom';
import { updateDataAuth } from '../../../services/update';
import { getUserRoleFromToken } from '../../../utils/jwt';
import { useForm } from 'react-hook-form';
import CategoriesContext from '../../../Context/CategoriesContext/CategoriesContext';

const BookDetailsCard = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const { setUpdate } = useContext(BooksContext);
  const { categories } = useContext(CategoriesContext);
  const token = localStorage.getItem('token');
  const role = getUserRoleFromToken(token);

  const [editTitle, setEditTitle] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [editIsbn, setEditIsbn] = useState(false);
  const [editPages, setEditPages] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editImage, setEditImage] = useState(false);
  // console.log(book.category.title);
  const { register, setValue, handleSubmit } = useForm();

  const fetchBook = async (id) => {
    try {
      const data = await getOneBook(id);
      setBook(data);
    } catch (error) {
      setError(error.message);
      toast.error('Error fetching book details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBook(id);
    if (book) {
      setValue('title', book.title);
      setValue('image', book.image);
      setValue('category', book.category.title);
      setValue('isbn', book.isbn);
      setValue('pages', book.pages);
      setValue('description', book.description);
    }
  }, [id, setValue]);

  const handleBookDescriptionChange = async (data) => {
    try {
      if (role === 'ADMIN') {
        await updateDataAuth(`books/${book.id}`, { description: data.description });
        setUpdate((prev) => !prev);
        setEditDescription(false);
        fetchBook(id);
      }
    } catch (error) {
      console.error('Error updating description:', error.message);
    }
  };

  const handleBookPagesChange = async (data) => {
    try {
      if (role === 'ADMIN') {
        await updateDataAuth(`books/${book.id}`, { pages: data.pages });
        setUpdate((prev) => !prev);
        setEditPages(false);
        fetchBook(id);
      }
    } catch (error) {
      console.error('Error updating pages:', error.message);
    }
  };

  const handleBookIsbnChange = async (data) => {
    try {
      if (role === 'ADMIN') {
        await updateDataAuth(`books/${book.id}`, { isbn: data.isbn });
        setUpdate((prev) => !prev);
        setEditIsbn(false);
        fetchBook(id);
      }
    } catch (error) {
      console.error('Error updating pages:', error.message);
    }
  };

  const handleBookCategoryChange = async (data) => {
    // console.log(data);
    // console.log('handle' + data.category.title);
    try {
      if (role === 'ADMIN') {
        await updateDataAuth(`books/${book.id}`, { category: data.category.title });
        setUpdate((prev) => !prev);
        setEditCategory(false);
        fetchBook(id);
      }
    } catch (error) {
      console.error('Error updating category:', error.message);
    }
  };

  const handleBookTitleChange = async (data) => {
    try {
      if (role === 'ADMIN') {
        await updateDataAuth(`books/${book.id}`, { title: data.title });
        setUpdate((prev) => !prev);
        setEditTitle(false);
        fetchBook(id);
      }
    } catch (error) {
      console.error('Error updating pages:', error.message);
    }
  };

  const handleBookImageChange = async (data) => {
    console.log(data);
    try {
      if (role === 'ADMIN') {
        await updateDataAuth(`books/${book.id}`, { image: data.image });
        setUpdate((prev) => !prev);
        setEditImage(false);
        fetchBook(id);
      }
    } catch (error) {
      console.error('Error updating image:', error.message);
    }
  };

  return (
    <div className='book-details-container'>
      <NavLink to={`/books`} className='back-arrow'>
        <ArrowCircleLeftOutlinedIcon />
        <p>Back to books</p>
      </NavLink>
      {book ? (
        <div className='book-details-card'>
          <div className='image-container'>
            {editImage && role === 'ADMIN' ? (
              <div className='input-book-image'>
                <input
                  className='input-image'
                  placeholder='Enter book url'
                  {...register('image')}
                  onChange={(e) => setValue('image', e.target.value)}
                />
                <CheckIcon
                  sx={{ color: 'green', cursor: 'pointer' }}
                  onClick={handleSubmit(handleBookImageChange)}
                />
                <CancelIcon
                  sx={{ color: 'tomato', cursor: 'pointer' }}
                  onClick={() => setEditImage(false)}
                />
              </div>
            ) : (
              <button className='edit-image-btn' onClick={() => setEditImage(true)}>
                edit image
              </button>
            )}
            <img
              className={`book-details-card-image ${editImage ? 'faded-image' : ''}`}
              src={`${book.image}`}
              alt='book'
            />
          </div>

          <div className='book-details-card-info'>
            {editTitle && role === 'ADMIN' ? (
              <div className='input-book-title'>
                <input
                  className='input-title'
                  {...register('title')}
                  defaultValue={book.title}
                  onChange={(e) => setValue('title', e.target.value)}
                />
                <div className='cancel-check'>
                  <CheckIcon
                    sx={{ color: 'green', cursor: 'pointer' }}
                    onClick={handleSubmit(handleBookTitleChange)}
                  />
                  <CancelIcon
                    sx={{ color: 'tomato', cursor: 'pointer' }}
                    onClick={() => setEditTitle(false)}
                  />
                </div>
              </div>
            ) : (
              <p>
                <b>Original title:</b> {book.title}{' '}
                {role === 'ADMIN' && (
                  <EditIcon
                    sx={{ cursor: 'pointer', fontSize: '1rem' }}
                    onClick={() => setEditTitle(true)}
                  />
                )}
              </p>
            )}
            {editCategory && role === 'ADMIN' ? (
              <div className='input-category'>
                <select
                  {...register('category')}
                  defaultValue={book.category.id}
                  onChange={(e) => {
                    setValue('category', e.target.value);
                    // handleBookCategoryChange({ category: e.target.value });
                    setEditCategory(false);
                  }}
                  onBlur={() => setEditCategory(false)}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p>
                <b>Category:</b> {book.category.title}{' '}
                {role === 'ADMIN' && (
                  <EditIcon
                    sx={{ cursor: 'pointer', fontSize: '1.1rem' }}
                    onClick={() => setEditCategory(true)}
                  />
                )}
              </p>
            )}

            {editIsbn && role === 'ADMIN' ? (
              <div className='input-isbn'>
                <input
                  {...register('isbn')}
                  defaultValue={book.isbn}
                  onChange={(e) => setValue('isbn', e.target.value)}
                />
                <div className='cancel-check'>
                  <CheckIcon
                    sx={{ color: 'green', cursor: 'pointer' }}
                    onClick={handleSubmit(handleBookIsbnChange)}
                  />
                  <CancelIcon
                    sx={{ color: 'tomato', cursor: 'pointer' }}
                    onClick={() => setEditIsbn(false)}
                  />
                </div>
              </div>
            ) : (
              <p>
                <b>Isbn:</b> {book.isbn}
                {role === 'ADMIN' && (
                  <EditIcon
                    sx={{ cursor: 'pointer', fontSize: '1rem' }}
                    onClick={() => setEditIsbn(true)}
                  />
                )}
              </p>
            )}
            {editPages && role === 'ADMIN' ? (
              <div className='input-pages'>
                <input
                  {...register('pages')}
                  defaultValue={book.pages}
                  onChange={(e) => setValue('pages', e.target.value)}
                />
                <div className='cancel-check'>
                  <CheckIcon
                    sx={{ color: 'green', cursor: 'pointer' }}
                    onClick={handleSubmit(handleBookPagesChange)}
                  />
                  <CancelIcon
                    sx={{ color: 'tomato', cursor: 'pointer' }}
                    onClick={() => setEditPages(false)}
                  />
                </div>
              </div>
            ) : (
              <p>
                <b>Pages:</b> {book.pages}{' '}
                {role === 'ADMIN' && (
                  <EditIcon
                    sx={{ cursor: 'pointer', fontSize: '1rem' }}
                    onClick={() => setEditPages(true)}
                  />
                )}
              </p>
            )}
            {editDescription && role === 'ADMIN' ? (
              <div>
                <textarea
                  {...register('description')}
                  className='edit-book-description'
                  defaultValue={book.description}
                  onChange={(e) => setValue('description', e.target.value)}
                />
                <div className='cancel-check'>
                  <CheckIcon
                    sx={{ color: 'green', cursor: 'pointer' }}
                    onClick={handleSubmit(handleBookDescriptionChange)}
                  />
                  <CancelIcon
                    sx={{ color: 'tomato', cursor: 'pointer' }}
                    onClick={() => setEditDescription(false)}
                  />
                </div>
              </div>
            ) : (
              <p>
                <b>Description:</b> {book.description}{' '}
                {role === 'ADMIN' && (
                  <EditIcon
                    sx={{ cursor: 'pointer', fontSize: '1rem' }}
                    onClick={() => setEditDescription(true)}
                  />
                )}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className='no-book-details'>No book details found</div>
      )}
    </div>
  );
};

export default BookDetailsCard;
