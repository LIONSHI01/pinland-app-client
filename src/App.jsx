import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Auth from './containers/Auth';
import Home from './containers/Home/Home';
import { fetchUser } from './utils/fetchUser';
const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = fetchUser();
    if (!user) navigate('/auth');
  }, []);

  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default App;
