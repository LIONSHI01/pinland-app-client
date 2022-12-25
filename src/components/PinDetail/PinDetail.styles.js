import styled from 'styled-components';
import { device } from '../../devices';

export const PinDetailPageContainer = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .goback-btn {
    position: absolute;
    top: 0;
    left: 0;
    height: 5rem;
    width: 5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    background-color: transparent;
    border-radius: 50%;
    transition: all 0.3s;
    cursor: pointer;

    @media ${device.laptop} {
      display: none;
    }

    :hover {
      background-color: var(--black-light-3);
    }

    :active {
      scale: 0.85;
    }
  }
`;

export const PinDetailContainer = styled.div`
  min-height: 20rem;
  min-width: 45rem;
  align-self: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  background-color: var(--white);
  padding: 2rem;
  border-radius: var(--br-m);
  box-shadow: var(--bs-s);
  margin: 0 12rem 5rem 12rem;

  @media ${device.laptop} {
    display: flex;
    flex-direction: column;
    padding: 3rem;
    margin: 0 14px var(--mg-xl);
  }
`;

export const ImageContainer = styled.section`
  border-radius: var(--br-s);
  position: relative;

  .image-box {
    position: relative;
  }

  .pin-image {
    width: 100%;
    height: auto;
    object-fit: fill;
    object-position: center;
    line-height: 0;
    border-radius: var(--br-m);
  }

  :hover .view-image-btn {
    visibility: visible;
  }

  .view-image-btn {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    background-color: var(--white);
    border-radius: 100px;
    border: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.2rem;
    opacity: 0.9;
    visibility: hidden;
    cursor: pointer;

    p {
      font-size: var(--fs);
    }
  }
`;

export const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;

  .comment-heading {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .details-container {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: var(--mg-m);
  }

  .info-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--mg-m);

    button {
      border: none;
    }
  }

  .destination-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .buttons-group {
    display: flex;
    gap: 0.5rem;
    margin-bottom: var(--mg-s);
  }

  .destination {
    text-decoration: underline;
    text-transform: lowercase;
    font-size: var(--fs-s);
  }

  .save-btn {
    display: flex;
    justify-content: center;
    align-self: flex-start;
    font-size: var(--fs);
    background-color: var(--red);
    padding: 1.2rem 2rem;
    color: var(--white);
    border-radius: 100px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;

    :hover {
      background-color: var(--red-dark);
    }

    :active {
      scale: 0.85;
    }
  }

  .saved {
    background-color: var(--black);
    :hover {
      background-color: var(--black);
    }
  }

  .title {
    text-transform: capitalize;
    font-size: var(--fs-xxl);
    margin-bottom: var(--mg-s);
  }
  .about {
    font-size: var(--fs-s);
    color: var(--black-light-2);
    margin-bottom: var(--mg-m);
  }

  .category {
    color: var(--black-light-2);
    text-transform: capitalize;

    a {
      :hover {
        color: var(--black);
      }
    }
  }
  .creator-info {
    display: flex;
    align-items: flex-end;

    span {
      color: var(--black-light-2);
    }
  }

  .postedby-link {
    display: flex;
    gap: 0.2rem;
    align-items: flex-end;
  }

  .postedBy-pfp {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
  }

  .postedBy-name {
    color: var(--black-light-2);
    transition: all 0.3s;

    border-bottom: 1px solid var(--black-light-2);

    :hover {
      font-weight: 600;

      color: var(--black);
    }
  }

  span {
    text-transform: capitalize;
    font-style: italic;
    margin-right: var(--mg-s);
  }
`;

export const SimilarPinsContainer = styled.div`
  margin: 0 var(--mg-xl) var(--mg-xl);

  .No-similar-pin {
    text-align: center;
    font-size: var(--fs);
  }

  @media ${device.tablet} {
    margin: unset;
  }
  h4 {
    font-size: var(--fs-xl);
    text-align: center;
    margin-bottom: var(--mg-m);
  }
`;

export const LoadingContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 8rem);

  background-color: var(--grey-light-1);
  display: flex;
  align-items: center;
  justify-content: center;
`;
