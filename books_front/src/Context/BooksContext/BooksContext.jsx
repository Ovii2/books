import { createContext, useState } from 'react';

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [update, setUpdate] = useState(0);

  return (
    <BooksContext.Provider value={{ books, setBooks, update, setUpdate }}>
      {children}
    </BooksContext.Provider>
  );
};

BooksContext.displayName = 'BooksContext';

export default BooksContext;
