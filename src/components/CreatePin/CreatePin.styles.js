import styled from 'styled-components';
import { device } from '../../devices';

export const CreatePinContainer = styled.div`
  /* width: 100vw;
  height: calc(100vh - 8rem); */

  min-height: calc(100vh - 10rem);
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainContainer = styled.div`
  /* width: 80vw;
  height: 70vh; */
  background-color: var(--white);
  margin: 3rem;
  display: flex;
  padding: 5rem;
  border-radius: var(--br-s);

  @media ${device.tablet} {
    flex-direction: column;
    gap: 3rem;
    padding: 1rem;
    margin: 1rem;
  }
`;

export const UploadContainer = styled.div`
  /* height: 100%; */
  width: 100%;

  background-color: var(--grey-light-1);
  padding: 1rem;
  color: var(--black-light-2);
  border-radius: var(--br-s);

  .inner-container {
    width: 100%;
    height: 100%;

    position: relative;
    border-radius: var(--br-s);
    border: 2px dotted var(--black-light-3);
    display: flex;
    flex-direction: column;
    padding: 1rem;
    cursor: pointer;
  }

  .upload-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: var(--mg-x);
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      color: var(--black);
    }

    p {
      font-size: var(--fs);
    }
  }
  .fomatting-reminder {
    font-size: var(--fs-ss);
    color: var(--black-light-2);
  }

  .upload-input {
    width: 0;
    height: 0;
  }

  .uploaded-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: top;
  }

  .delete-btn {
    position: absolute;
    bottom: 2rem;
    border-radius: 100px;
    height: 3rem;
    width: 3rem;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--white);
    opacity: 0.75;
    transition: all 0.3s;

    cursor: pointer;
    :hover {
      opacity: 1;
    }
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;

  .select-field {
    width: 100%;
    padding-bottom: 1rem;

    p {
      font-size: var(--fs);
      margin-bottom: var(--mg-s);
      color: var(--black-light-2);
      font-weight: 500;
    }

    select {
      width: 80%;
      border: none;
      padding: 0.5rem;
      border-bottom: 1px solid var(--black-light-3);
      margin-bottom: var(--mg-m);
      color: var(--black-light-2);
    }
  }

  button {
    padding: 0.8rem 1.6rem;
    border: none;
    color: var(--white);
    background-color: var(--red);
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.3s;
    align-self: flex-end;

    :hover {
      background-color: var(--red-dark);
    }
  }
`;
