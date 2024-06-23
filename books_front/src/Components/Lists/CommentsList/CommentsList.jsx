import { useContext } from 'react';
import CommentsContext from '../../../Context/CommentsContext/CommentContext';
import CommentCard from '../../Cards/CommentCard/CommentCard';

import './CommentsList.css';

const CommentsList = () => {
  const { setUpdate, comments } = useContext(CommentsContext);
  return (
    <>
      <div className='comments-list'>
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} setUpdate={setUpdate} />
        ))}
      </div>
    </>
  );
};

export default CommentsList;
