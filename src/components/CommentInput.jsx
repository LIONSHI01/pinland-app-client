import React from 'react';
import styled from 'styled-components';

import Button, { BUTTON_TYPES_CLASSES } from './Button';
import { UserIcon } from './index';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  img {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
  }

  input {
    width: 100%;
    height: 3rem;
    border-radius: 100px;
    outline: none;
    border: 1px solid var(--black-light-3);
    background-color: var(--white);
    padding: 2rem;
    transition: all 0.3s;
    font-family: inherit;

    ::placeholder {
      font-family: inherit;
    }

    :hover {
      border: 1px solid var(--black-light-2);
    }

    :focus {
      box-shadow: 0 0 0 0.6rem var(--blue-light-3);
    }
  }

  .top {
    display: flex;
    margin-bottom: var(--mg-s);
    align-items: center;
    gap: 0.5rem;
  }

  .button-group {
    display: flex;
    gap: 1rem;
    align-self: flex-end;
  }
`;

const CommentInput = ({
  loginedUser,
  editComment,
  setEditedComment,
  editedComment,
  setShowCommentEditor,
}) => {
  return (
    <InputContainer>
      <div className="top">
        <UserIcon iconImage={loginedUser?.image} />
        <input
          placeholder="Reply"
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
        />
      </div>
      <div className="button-group">
        <Button
          buttonType={BUTTON_TYPES_CLASSES.grey}
          size="m"
          type="button"
          onClick={() => setShowCommentEditor(false)}
        >
          Cancel
        </Button>
        <Button
          buttonType={BUTTON_TYPES_CLASSES.grey}
          size="m"
          valueLength={editedComment?.length}
          type="button"
          onClick={editComment}
        >
          Save
        </Button>
      </div>
    </InputContainer>
  );
};

export default CommentInput;
