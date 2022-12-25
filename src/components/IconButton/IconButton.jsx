import React from 'react';

import { ButtonContainer } from './IconButton.styles';

const IconButton = ({ children, rotateDown, size, ...otherProps }) => {
  return (
    <ButtonContainer size={size} rotateDown={rotateDown} {...otherProps}>
      {children}
    </ButtonContainer>
  );
};

export default IconButton;
