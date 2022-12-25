import styled from 'styled-components';

export const CreateCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: auto;

  .comment-top {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .user-pfp {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
  }

  textarea {
    width: 100%;
    min-height: 4rem;
    max-height: 20rem;
    border-radius: 100px;
    outline: none;
    border: 1px solid var(--black-light-3);
    background-color: var(--white);
    padding: 1rem;
    transition: all 0.3s;
    font-family: inherit;
    overflow: hidden;
    font-size: var(--fs-s);
    resize: none;

    ::placeholder {
      font-family: inherit;
      font-size: var(--fs-s);
    }

    :hover {
      border: 1px solid var(--black-light-2);
    }

    :focus {
      border-radius: var(--br-m);
      box-shadow: 0 0 0 0.6rem var(--blue-light-3);
    }
  }

  .comment-buttons-group {
    display: flex;
    gap: 1rem;
    align-self: flex-end;

    transition: all 0.3s;
  }
`;
