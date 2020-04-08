import React from 'react';
import Button from 'react-bootstrap/Button';
import { AiOutlineSolution, AiFillCheckCircle } from 'react-icons/ai';
import PropTypes from 'prop-types';

const PostSubtitle = ({
  postType, solution, author, openSolForm, currentUserID,
}) => {
  if (postType === 'Solution') return null;
  const alreadySolved = (
    <>
      <AiFillCheckCircle />
      Already solved!
    </>
  );
  const notSolved = (
    <>
      <AiOutlineSolution />
      Solve now!
    </>
  );
  if (solution) {
    return (
      <Button variant="link" href={`/post/${solution}`}>
        {alreadySolved}
      </Button>
    );
  }
  if (author !== currentUserID) {
    return (
      <Button variant="link" onClick={openSolForm}>
        {notSolved}
      </Button>
    );
  }
  return null;
};

export default PostSubtitle;

PostSubtitle.propTypes = {
  postType: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  solution: PropTypes.string,
  openSolForm: PropTypes.func.isRequired,
  currentUserID: PropTypes.string.isRequired,
};

PostSubtitle.defaultProps = {
  solution: '',
};
