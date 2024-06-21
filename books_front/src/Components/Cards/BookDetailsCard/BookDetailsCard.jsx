import { useContext, useEffect, useState } from 'react';
import { getOneBook } from '../../../services/get';
import BooksContext from '../../../Context/BooksContext/BooksContext';
import { toast } from 'react-toastify';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

import './BookDetailsCard.css';
import { NavLink, useParams } from 'react-router-dom';

const BookDetailsCard = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState(null);
  const { id } = useParams();

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
  }, [id]);

  return (
    <div className='book-details-container'>
      <NavLink to={`/books`} className='back-arrow'>
        <ArrowCircleLeftOutlinedIcon />
        <p>Back to books</p>
      </NavLink>
      {book ? (
        <div className='book-details-card'>
          <div>
            <img className='book-details-card-image' src={`${book.image}`} alt='book' />
          </div>
          <div className='book-details-card-info'>
            <p>
              <b>Original title:</b> {book.title}
            </p>
            <p>
              <b>Category:</b> {book.category.title}
            </p>
            <p>
              <b>Isbn:</b> {book.isbn}
            </p>
            <p>
              <b>Pages:</b> {book.pages}
            </p>
            <p>
              <b>Description:</b> {book.description}
            </p>
          </div>
        </div>
      ) : (
        <div>No book details found</div>
      )}
    </div>
  );
};

export default BookDetailsCard;
