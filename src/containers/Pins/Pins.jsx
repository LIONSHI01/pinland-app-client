import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Feed, PinDetail, Navbar, CreatePin, Search } from '../../components';

import { PinsContainer } from './Pins.styles';

const Pins = ({ loginedUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sticky, setSticky] = useState(false);

  const setNavSticky = () => {
    if (window.scrollY >= 1) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', setNavSticky, true);
  }, []);

  return (
    <PinsContainer sticky={sticky}>
      <div className="sticky-nav-gap">&nbsp;</div>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        loginedUser={loginedUser}
        sticky={sticky}
      />

      <div className="content-container">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail loginedUser={loginedUser} />}
          />
          <Route
            path="/create-pin"
            element={<CreatePin loginedUser={loginedUser} />}
          />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </PinsContainer>
  );
};

export default Pins;
