import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { UserIcon } from './index';

import { client } from '../utils/client';

import {
  addFollowerRequest,
  addFollowingRequest,
  unfollowRequest,
  unfollowingRequest,
} from '../utils/requests';

import Button, { BUTTON_TYPES_CLASSES } from './Button';

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 100%;

  img {
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
  }

  .details {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .username {
    font-size: var(--fs-ss);
    color: var(--black);
    font-weight: 700;
  }

  .followers {
    color: var(--black-light-3);
  }
`;

const CreatorItem = ({
  creator,
  isFollowing = false,
  loginUserProfile,
  isSamePerson,
}) => {
  // const isSamePerson = creator?._id === loginUserProfile?._id;

  const followHandler = (user) => {
    // Toggle to FOLLOW the user
    if (!isFollowing) {
      addFollowerRequest(user, loginUserProfile, client).then(() => {
        toast.success(
          `Follow ${user?.userName} successfully! Portfolio will be updated soon.`
        );
      });

      addFollowingRequest(user, loginUserProfile, client);
    } else if (isFollowing) {
      // Toggle to UNFOLLOW the user
      unfollowRequest(user, loginUserProfile, client).then(() => {
        toast.success(
          `Unfollow ${user?.userName} successfully! Portfolio will be updated soon.`
        );
      });
      unfollowingRequest(user, loginUserProfile, client);
    }
  };
  return (
    <ItemContainer>
      <Link to={`/user-profile/${creator?._id}`}>
        {/* <img src={creator?.image} alt="creator" /> */}
        <UserIcon iconImage={creator?.image} />
      </Link>
      <div className="details">
        <div className="info">
          <p className="username">{creator?.userName}</p>
          <span className="followers">
            {creator?.followers?.length || 0} followers
          </span>
        </div>
        {!isSamePerson && (
          <Button
            buttonType={BUTTON_TYPES_CLASSES.grey}
            state={isFollowing}
            onClick={() => followHandler(creator)}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        )}
      </div>
    </ItemContainer>
  );
};

export default CreatorItem;
