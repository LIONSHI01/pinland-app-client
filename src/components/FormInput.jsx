import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  border-bottom: 1px solid var(--black-light-3);
  padding: 0.5rem;
  margin-bottom: var(--mg-m);
  display: flex;
  flex-direction: column;

  label {
    font-size: var(--fs-x);
    text-transform: capitalize;
    margin-bottom: var(--mg-s);
    font-weight: 600;
    color: var(--black-light-2);
  }

  input {
    width: 100%;
    outline: none;
    border: none;
    font-size: var(--fs-s);
    font-family: inherit;
    color: var(--black);
    background-color: transparent;
  }
`;

const FormInput = ({ label, ...otherProps }) => {
  return (
    <InputContainer>
      {label && <label>{label}</label>}
      <input {...otherProps} />
    </InputContainer>
  );
};

export default FormInput;
