import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import './BookCard.css';

const BookCard = ({ book, setUpdate }) => {
  const { category, title, isbn, image, pages, description } = book;

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
    <div className='book-card'>
      <img src={`${image}`} alt='book' />
      <p>Category: {category.title}</p>
      <p>Title: {title}</p>
      <p>Isbn: {isbn}</p>
      <p>Pages: {pages}</p>
      <p>Description: {description}</p>
    </div>
  );
};

export default BookCard;
