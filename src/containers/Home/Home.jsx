import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { client } from '../../utils/client';
import { UserProfile } from '../../components';
import Pins from '../Pins/Pins';
import { HomeContainer, PinContainer } from './Home.styles';
import { fetchUser } from '../../utils/fetchUser';
import { userQuery } from '../../utils/dataQuery';

const Home = () => {
  const [user, setUser] = useState(null);
  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => setUser(data[0]));
  }, []);

  return (
    <HomeContainer>
      <PinContainer>
        <Routes>
          <Route
            path="/user-profile/:userId"
            element={<UserProfile loginedUser={user && user} />}
          />
          <Route path="/*" element={<Pins loginedUser={user && user} />} />
        </Routes>
      </PinContainer>
    </HomeContainer>
  );
};

export default Home;
