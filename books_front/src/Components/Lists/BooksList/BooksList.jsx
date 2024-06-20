import { useContext } from 'react';
import BooksContext from '../../../Context/BooksContext/BooksContext';
import BookCard from '../../Cards/BookCard/BookCard';

import './BooksList.css';

const BooksList = () => {
  const { setUpdate, books } = useContext(BooksContext);

  return (
    <>
      <div className='books-list'>
        {books.map((book) => (
          <BookCard key={book.id} book={book} setUpdate={setUpdate} />
        ))}
      </div>
    </>
  );
};

export default BooksList;
