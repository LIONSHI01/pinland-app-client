import styled from 'styled-components';

export const CommentItemContainer = styled.div`
  margin-top: auto;
  margin-bottom: var(--mg-s);
  padding-bottom: 1rem;
  margin-left: ${(props) => (props.isReply ? '3.5rem' : '0')};

  .comment-details {
    display: flex;
    gap: 0.7rem;
  }

  .like-info {
    display: flex;
    align-items: center;
    color: var(--black-light-2);
  }

  .comment-postedby-pfp {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
  }

  .postedby-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  .comment-postedby-name {
    font-weight: 700;
  }

  .comment {
    color: var(--black-light-2);
    flex-wrap: wrap;
  }

  .details-top {
    display: flex;
    gap: 1rem;
    font-size: var(--fs-ss);
  }

  .details-bottom {
    display: flex;
    gap: 1rem;
    align-items: center;

    button {
      border: none;

      cursor: pointer;
      color: var(--black-light-2);

      &:hover {
        color: var(--black);
      }
    }
  }

  .period {
    color: var(--black-light-2);
    text-transform: lowercase;
  }

  .reply-btn {
    font-size: 1.4rem;
    background-color: transparent;
  }

  .menu-functions {
    position: relative;
  }

  .dropdown-window {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 10rem;
    transform: translateY(115%);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: var(--white);
    box-shadow: var(--bs-s);
    border-radius: var(--br-s);
    padding: 1rem;
    z-index: 100;

    li {
      border-radius: var(--br-s);
      padding: 0.8rem 1.6rem;
      font-size: var(--fs-s);
      cursor: pointer;

      :hover {
        background-color: var(--grey-light-2);
      }
    }
  }
`;

export const CommentInputSection = styled.div`
  margin-bottom: var(--mg-s);
`;
