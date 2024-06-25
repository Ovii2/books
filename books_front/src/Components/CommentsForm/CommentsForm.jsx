import { useContext, useState } from 'react';
import CommentsContext from '../../Context/CommentsContext/CommentContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { postComment } from '../../services/post';

import './CommentsForm.css';
import { useParams } from 'react-router-dom';

const CommentsForm = () => {
  const { setUpdate } = useContext(CommentsContext);
  const [error, setError] = useState('');

  const { id: bookId } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: '',
    },
  });

  const formSubmitHandler = async (data) => {
    try {
      const response = await postComment(data, bookId);
      setUpdate((update) => update + 1);
      reset();
      toast.success('Comment added!');
      return response;
    } catch (error) {
      setError(error.message);
      toast.error('Error adding comment');
    }
  };

  return (
    <form className='comments-form' noValidate onSubmit={handleSubmit(formSubmitHandler)}>
      <textarea
        {...register('comment', {
          required: 'Comment is required',
        })}
        className='comment-input'
        id='comment'
        placeholder='Add comment'
      ></textarea>
      {errors.comment && <div className='error'>{errors.comment.message}</div>}
      <button className='add-comment-btn' type='submit'>
        Add comment
      </button>
    </form>
  );
};

export default CommentsForm;
