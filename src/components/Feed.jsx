import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { client } from '../utils/client';
import { feedQuery, searchQuery } from '../utils/dataQuery';
import { MasonryLayout, Spinner } from './';

const FeedContainer = styled.div`
  position: relative;
  width: 100vw;
  min-height: calc(100vh - 8rem);
  margin: 0 var(--mg-x);
`;

const LoadingContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 8rem);

  background-color: var(--grey-light-1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Feed = () => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => setPins(data));
      setLoading(false);
    } else {
      client.fetch(feedQuery).then((data) => setPins(data));
      setLoading(false);
    }
  }, [categoryId]);

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner message="We are adding new ideas to your feed!" />;
      </LoadingContainer>
    );
  }
  return <FeedContainer>{pins && <MasonryLayout pins={pins} />}</FeedContainer>;
};

export default Feed;
