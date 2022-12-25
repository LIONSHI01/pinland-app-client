import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  min-height: 50rem;
  max-height: 90vh;
  min-width: 80rem;
  max-width: 60vw;
  border-radius: var(--br-x);
  background-color: var(--white);

  z-index: 2000;

  display: grid;
  grid-template-rows: min-content 1fr min-content;
  box-shadow: var(--br-s);

  .heading {
    height: 100%;
    width: 100%;
    padding: 2rem 0;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.15);

    h2 {
      text-align: center;
      font-size: var(--fs-xxl);
      font-weight: 600;
    }
  }
`;

export const ContentContainer = styled.div`
  /* height: 60%; */
  padding: 3rem 4rem;
  display: grid;
  grid-template-columns: 1fr min-content;
  gap: 5rem;
  overflow-y: scroll;
`;

export const ImageContainer = styled.div`
  img {
    display: block;
    border-radius: var(--br-s);
  }
`;
export const FormContainer = styled.div`
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
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  /* margin: 2rem 0; */
  box-shadow: 0 -5px 5px -5px rgba(0, 0, 0, 0.15);
  padding: 3rem 4rem;
  .edit-buttons {
    display: flex;
    gap: 1rem;
  }
`;
