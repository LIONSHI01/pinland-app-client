import React from 'react';
import styled, { css } from 'styled-components';

const mediumSizeStyles = css`
  padding: 0.8rem 1.2rem;
`;

const activeFillinStyles = css`
  background-color: var(--red);
  color: var(--white);

  :hover {
    background-color: var(--red-dark);
  }
`;

const BaseButton = styled.button`
  border: none;
  border-radius: 100px;
  padding: 1.2rem 2.4rem;
  font-size: var(--fs-s);
  transition: all 0.3s;
  color: var(--white);
  cursor: pointer;

  background-color: ${(props) => (props.state ? 'var(--black)' : 'var(--red)')};

  ${(props) => props.size === 'm' && mediumSizeStyles}

  :hover {
    background-color: ${(props) =>
      props.state ? 'var(--black)' : 'var(--red-dark)'};
  }

  :active {
    scale: 0.85;
  }
`;

const OutlineRedButton = styled(BaseButton)`
  background-color: var(--white);
  border: 2px solid var(--red);
  color: var(--black);

  :hover {
    background-color: var(--grey-light-1);
  }
`;

const GreyButton = styled(BaseButton)`
  color: ${(props) => (props.state ? 'var(--white)' : 'var(--black)')};

  background-color: ${(props) =>
    props.state ? 'var(--black)' : 'var(--grey-light-2)'};

  :hover {
    background-color: ${(props) =>
      props.state ? 'var(--black)' : 'var(--grey-light-1)'};
  }

  ${(props) => props.valueLength && activeFillinStyles}
`;

export const BUTTON_TYPES_CLASSES = {
  base: 'base',
  outlineRed: 'outline-red',
  grey: 'grey',
};

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base) =>
  ({
    [BUTTON_TYPES_CLASSES.base]: BaseButton,
    [BUTTON_TYPES_CLASSES.outlineRed]: OutlineRedButton,
    [BUTTON_TYPES_CLASSES.grey]: GreyButton,
  }[buttonType]);

const Button = ({
  children,
  buttonType,
  state = false,
  valueLength,
  ...otherProps
}) => {
  const CustomButton = getButton(buttonType);

  return (
    <CustomButton valueLength={valueLength} state={state} {...otherProps}>
      {children}
    </CustomButton>
  );
};

export default Button;
