import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { client } from '../utils/client';
import Button, { BUTTON_TYPES_CLASSES } from './Button';

import { replyCommentRequest } from '../utils/requests';
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

const ReplyInput = ({ pin, comment, loginedUser, setShowReplyInput }) => {
  const [reply, setReply] = useState('');
  const [replying, setReplying] = useState(false);

  // HANDLER
  const replyCommentHandler = (replyText) => {
    setReplying(true);
    replyCommentRequest(pin, comment, replyText, loginedUser, client)
      .then(() => {
        setReplying(false);
        setReply('');
        toast.success(`You have replied ${comment?.postedBy?.userName}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <InputContainer>
      <div className="top">
        {/* <img src={loginedUser?.image} alt="user" /> */}
        <UserIcon iconImage={loginedUser?.image} />
        <input
          placeholder="Reply"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
      </div>
      <div className="button-group">
        <Button
          buttonType={BUTTON_TYPES_CLASSES.grey}
          size="m"
          type="button"
          onClick={() => setShowReplyInput(false)}
        >
          Cancel
        </Button>
        <Button
          buttonType={BUTTON_TYPES_CLASSES.grey}
          size="m"
          valueLength={reply?.length}
          type="button"
          onClick={() => replyCommentHandler(reply)}
        >
          {replying ? 'Replying' : 'Reply'}
        </Button>
      </div>
    </InputContainer>
  );
};

export default ReplyInput;
