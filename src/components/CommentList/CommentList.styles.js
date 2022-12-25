import styled from 'styled-components';

export const CommentsListContainer = styled.div`
  margin-bottom: var(--mg-m);
  width: 100%;

  h3 {
    font-size: var(--fs);
    font-weight: 500;
  }

  .no-comment-msg {
    font-size: var(--fs-s);
    text-align: center;
    color: var(--black-light-2);
    margin-bottom: var(--mg-m);
  }
`;

export const CreateCommentContainer = styled.div`
  margin-top: var(--mg-m);
`;
