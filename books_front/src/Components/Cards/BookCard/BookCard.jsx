import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import './BookCard.css';
import { NavLink } from 'react-router-dom';

const BookCard = ({ book, setUpdate }) => {
  const { category, title, isbn, image, pages, id } = book;

  const { setValue } = useForm();

  useEffect(() => {
    if (book) {
      setValue('category', book.category);
      setValue('title', book.title);
      setValue('isbn', book.isbn);
      setValue('image', book.image);
      setValue('pages', book.pages);
      setValue('description', book.description);
    }
  }, [category, setValue]);

  return (
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
  );
};

export default BookCard;
