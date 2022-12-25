import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { toast } from 'react-toastify';

import { IconButton, CommentInput, ReplyInput, UserIcon } from '../index';
import { timeDiff } from '../../utils/timeCalculator';
import {
  deleteCommentRequest,
  editCommentRequest,
  toggleLikeCommentRequest,
} from '../../utils/requests';
import { client } from '../../utils/client';

import {
  CommentItemContainer,
  CommentInputSection,
} from './CommentItem.styles';

const CommentItem = ({ pin, comment, loginedUser, isReply }) => {
  // CONFIGURATION
  const navigate = useNavigate();
  const { _updatedAt } = comment;
  const period = timeDiff(_updatedAt);
  const isCommentPerson = comment?.postedBy?._id === loginedUser?._id;

  // STATE MANAGEUEMNT
  const [isDropdown, setIsDropdown] = useState(false);
  const [showCommentEditor, setShowCommentEditor] = useState(false);
  const [editedComment, setEditedComment] = useState(comment?.comment);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const ref = useRef();
  const isliked = !!comment?.likes?.filter(
    (item) => item.userId === loginedUser?._id
  ).length;

  // HANDLER
  const toggleDropdown = () => setIsDropdown((prev) => !prev);
  const deleteCommentHandler = () => {
    deleteCommentRequest(comment, client).then(() => {
      navigate(0);
      toast.success('Comment deleted successfully.');
    });
  };

  const editCommentHandler = () => {
    editCommentRequest(comment, editedComment, client).then(() => {
      navigate(0);
      toast.success('Updated comment!');
    });
    setShowCommentEditor(false);
  };

  const likeCommentHandler = () => {
    toggleLikeCommentRequest(comment, loginedUser, client);
  };

  // Control dropdown
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isDropdown && !ref.current?.contains(e.target)) {
        setIsDropdown(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside, true);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside, true);
    };
  }, [isDropdown]);

  return (
    <>
      {!showCommentEditor ? (
        <CommentItemContainer isReply={isReply} key={comment?._key}>
          <div className="comment-details">
            <Link to={`/user-profile/${comment?.postedBy?._id}`}>
              {/* <img
                src={comment?.postedBy?.image}
                alt="postedby-pfp"
                className="comment-postedby-pfp"
              /> */}

              <UserIcon iconImage={comment?.postedBy?.image} />
            </Link>
            <div className="postedby-details">
              <div className="details-top">
                <div className="comment-postedby-name">
                  {comment?.postedBy?.userName}
                </div>
                <p className="comment">{comment?.comment}</p>
              </div>
              <div className="details-bottom">
                <span className="period">{period}</span>

                {/* <IconButton
                  type="button"
                  size="small"
                  onClick={() => setShowReplyInput((prev) => !prev)}
                >
                  <BsFillReplyFill size={15} />
                </IconButton> */}
                <div className="like-info">
                  <IconButton
                    type="button"
                    size="small"
                    onClick={likeCommentHandler}
                  >
                    <AiFillHeart
                      size={15}
                      color={isliked ? 'var(--red)' : null}
                    />
                  </IconButton>
                  {comment?.likes?.length}
                </div>
                <div className="menu-functions" ref={ref}>
                  {isCommentPerson && (
                    <IconButton
                      type="button"
                      size="small"
                      onClick={toggleDropdown}
                    >
                      <BsThreeDots size={15} />
                    </IconButton>
                  )}
                  {isDropdown && (
                    <ul className="dropdown-window">
                      <li
                        onClick={() => {
                          setIsDropdown(false);
                          setShowCommentEditor(true);
                        }}
                      >
                        Edit
                      </li>
                      <li
                        onClick={() => {
                          deleteCommentHandler();
                          setIsDropdown(false);
                        }}
                      >
                        Delete
                      </li>
                    </ul>
                  )}
                </div>
              </div>
              {showReplyInput && (
                <ReplyInput
                  pin={pin}
                  loginedUser={loginedUser}
                  setShowReplyInput={setShowReplyInput}
                  comment={comment}
                />
              )}
            </div>
          </div>
        </CommentItemContainer>
      ) : (
        <CommentInputSection>
          <CommentInput
            pin={pin}
            comment={comment}
            loginedUser={loginedUser}
            setEditedComment={setEditedComment}
            editedComment={editedComment}
            setShowCommentEditor={setShowCommentEditor}
            editComment={editCommentHandler}
          />
        </CommentInputSection>
      )}
    </>
  );
};

export default CommentItem;
