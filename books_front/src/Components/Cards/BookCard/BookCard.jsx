import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { NavLink } from 'react-router-dom';

import './BookCard.css';
import { getUserRoleFromToken } from '../../../utils/jwt';
import { deleteBook } from '../../../services/delete';
import { toast } from 'react-toastify';

const BookCard = ({ book, setUpdate }) => {
  const { category, title, isbn, image, pages, id } = book;
  const [error, setError] = useState(null);
  const { setValue } = useForm();

  const token = localStorage.getItem('token');
  const role = getUserRoleFromToken(token);

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(`Are you sure you want to delete ${title}?`);
      if (confirmed && role === 'ADMIN') {
        await deleteBook(id);
        setUpdate((update) => update + 1);
      }
    } catch (error) {
      toast.error(`Error deleting book: ${error.message}`);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (book) {
      setValue('category', book.category);
      setValue('title', book.title);
      setValue('isbn', book.isbn);
      setValue('image', book.image);
      setValue('pages', book.pages);
      // setValue('description', book.description);
    }
  }, [category, setValue]);

  return (
    <div className='card-container'>
      {role === 'ADMIN' && (
        <HighlightOffIcon
          className='delete-icon'
          sx={{ cursor: 'pointer', color: 'var(--tomato)' }}
          onClick={() => handleDelete(id)}
        />
      )}
      <NavLink to={`/books/${id}`} book={book}>
        <div className='book-card'>
          <img className='book-img' src={`${image}`} alt='book' />
          <div className='book-info'>
            <p>Title: {title}</p>
            <p>Category: {category.title}</p>
            <p>Isbn: {isbn}</p>
            <p>Pages: {pages}</p>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default BookCard;
