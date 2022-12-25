import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button, { BUTTON_TYPES_CLASSES } from '../Button';

import { WarningModal } from '../';

import { CreateCommentContainer } from './CreateComment.styles';

const CreateComment = ({
  loginedUser,
  addComment,
  addingComment,
  comment,
  setComment,
}) => {
  const [showButtons, setShowButtons] = useState(false);
  const [showWarnModal, setShowWarnModal] = useState(false);

  return (
    <>
      <CreateCommentContainer>
        <div className="comment-top">
          <Link to={`/user-profile/${loginedUser?._id}`}>
            <img src={loginedUser?.image} alt="user" className="user-pfp" />
          </Link>
          <textarea
            type="text"
            placeholder="Add a comment"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onClick={() => setShowButtons(true)}
            maxLength={200}
          />
        </div>
        {showButtons && (
          <div className="comment-buttons-group">
            <Button
              buttonType={BUTTON_TYPES_CLASSES.grey}
              onClick={() => {
                if (comment) {
                  setShowWarnModal(true);
                }
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              buttonType={BUTTON_TYPES_CLASSES.grey}
              valueLength={comment?.length}
              onClick={addComment}
            >
              {addingComment ? 'Posting...' : 'Post'}
            </Button>
          </div>
        )}
      </CreateCommentContainer>
      {showWarnModal && comment && (
        <WarningModal
          setShowWarnModal={setShowWarnModal}
          setConfirmFn={setComment}
          message="Once you delete a draft, you lost the record."
        />
      )}
    </>
  );
};

export default CreateComment;
