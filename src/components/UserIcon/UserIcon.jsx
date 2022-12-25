import React from 'react';
import { UserIconWrapper } from './UserIcon.styles';

// https://i.ibb.co/ZJCDDt4/27-ARISTOTLE-jumbo.jpg

const UserIcon = ({ iconImage, size = 's' }) => {
  const addDefaultImage = (e) => {
    e.target.src = '/icon-placeholder.png';
  };

  return (
    <UserIconWrapper size={size}>
      <img
        onError={addDefaultImage}
        src={iconImage}
        alt="user-icon"
        className="user-image"
      />
    </UserIconWrapper>
  );
};

export default UserIcon;
