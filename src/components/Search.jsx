import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { client } from '../utils/client';
import { MasonryLayout, Spinner } from './';
import { feedQuery, searchQuery } from '../utils/dataQuery';

const SearchContainer = styled.section`
  width: 100%;
  height: 100%;

  .loading-container {
    height: calc(100vh - 10rem);
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .not-found {
    height: calc(100vh - 10rem);
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: var(--fs-xl);
    color: var(--black-light-2);
    font-weight: 600;
  }

  .display-container {
    margin: 0 var(--mg-x);
  }
`;

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);

      const userSearchQuery = searchQuery(searchTerm);
      client.fetch(userSearchQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <SearchContainer>
      {loading && (
        <div className="loading-container">
          <Spinner message="Searching for pins..." />
        </div>
      )}
      {pins?.length > 0 && (
        <div className="display-container">
          <MasonryLayout pins={pins} />
        </div>
      )}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="not-found">No Pins Found!</div>
      )}
    </SearchContainer>
  );
};

export default Search;
