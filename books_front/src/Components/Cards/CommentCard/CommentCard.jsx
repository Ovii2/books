import { useEffect } from 'react';
import './CommentCard.css';
import { useForm } from 'react-hook-form';

const CommentCard = ({ comment, setUpdate }) => {
  const { comment: newComment, date } = comment;
  const { register, setValue, handleSubmit } = useForm();

  useEffect(() => {
    if (comment) {
      setValue('comment', comment.comment);
    }
  }, [comment, setValue]);

  return (
    <div className='comment-card'>
      <div className='username-date'>
        <p>{comment.user.username}</p>
        <p>{date}</p>
      </div>
      <input type='text' className='comment-text' name='' id='' defaultValue={newComment} />
    </div>
  );
};

export default CommentCard;
