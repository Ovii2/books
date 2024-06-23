import { createContext, useState } from 'react';

const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [update, setUpdate] = useState(0);

  return (
    <CommentsContext.Provider value={{ comments, setComments, update, setUpdate }}>
      {children}
    </CommentsContext.Provider>
  );
};

CommentsContext.displayName = 'CommentsContext';

export default CommentsContext;
