import React, { useState } from 'react';

import { CreateComment, IconButton, CommentItem } from '../';

import { IoIosArrowForward } from 'react-icons/io';

import {
  CommentsListContainer,
  CreateCommentContainer,
} from './CommentList.styles';

const CommentList = ({
  pinDetail,
  pinComments,
  loginedUser,
  comment,
  isSamePerson,
  addComment,
  addingComment,
  setComment,
}) => {
  // CONFIGURATION

  // STATE MANAGEMENT
  const [showComment, setShowComment] = useState(false);

  return (
    <CommentsListContainer>
      <div className="comment-heading">
        <h3>{pinComments?.length || 0}&nbsp;Comments</h3>
        <IconButton
          rotateDown={showComment}
          onClick={() => setShowComment((prev) => !prev)}
        >
          <IoIosArrowForward size={20} />
        </IconButton>
      </div>
      {showComment && (
        <>
          {pinComments?.length > 0 ? (
            <>
              {pinComments?.map((comment) => (
                <CommentItem
                  key={comment?._id}
                  comment={comment}
                  loginedUser={loginedUser}
                  pin={pinDetail}
                  isSamePerson={isSamePerson}
                />
              ))}
            </>
          ) : (
            <p className="no-comment-msg">No Comment yet. Let's leave one!</p>
          )}
          <CreateCommentContainer>
            <CreateComment
              loginedUser={loginedUser}
              addComment={addComment}
              addingComment={addingComment}
              comment={comment}
              setComment={setComment}
            />
          </CreateCommentContainer>
        </>
      )}
    </CommentsListContainer>
  );
};

export default CommentList;
