import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PinContainer = styled.div`
  margin: 1rem;
  line-height: 0;
`;

export const ContentContainer = styled.div`
  /* width: 100%; */
  height: auto;
  border-radius: var(--br-m);
  overflow: hidden;
  position: relative;
  cursor: zoom-in;

  .pin-image {
    width: 100%;
  }
`;
export const SubContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;

  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.45);
`;

export const UpperContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;

  .download-box {
  }

  .download-link {
    background-color: var(--white);
    height: 3rem;
    width: 3rem;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.75;
    transition: all 0.3s;
    :hover {
      opacity: 1;
    }
  }
  .download-icon {
    display: block;
    line-height: 0;
  }

  .save-button {
    background-color: var(--red);
    border: none;
    border-radius: 100px;
    padding: 0.5rem 1rem;
    color: var(--white);
    opacity: 0.75;
    font-size: var(--fs-s);
    cursor: pointer;

    :hover {
      opacity: 1;
    }
  }
`;

export const LowerContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .destination-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--white);
    opacity: 0.75;
    padding: 0.2rem 0.5rem;
    border-radius: 100px;

    :hover {
      opacity: 1;
    }

    p {
      font-weight: 600;
    }
  }

  .delete-button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    width: 3rem;
    border-radius: 100px;
    border: none;
    background-color: var(--white);
    opacity: 0.75;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
`;

export const PostedByContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.8rem;

  .user-image {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
  }
  p {
    font-weight: 600;
    font-size: var(--fs-ss);
  }
`;
