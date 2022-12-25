import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  IoMdAdd,
  IoMdSearch,
  IoIosArrowDown,
  IoMdCloseCircle,
} from 'react-icons/io';

import { FiMenu } from '../ReactIcons';

import logo from '../../assets/logo.png';
import { MobileSidebar, UserIcon } from '../index';
import { categories } from '../../utils/dataQuery';
import {
  NavbarContainer,
  DropdownMenu,
  LogoContainer,
  SearchBoxContainer,
} from './Navbar.styles';

const Navbar = ({ searchTerm, setSearchTerm, loginedUser, sticky }) => {
  const navigate = useNavigate();
  const ref = useRef();

  const [isDropdown, setIsDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showClearBtn, setShowClearBtn] = useState(false);

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsDesktop(true);
      setShowSidebar(false);
    } else {
      setIsDesktop(false);
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isDropdown && ref.current && !ref.current.contains(e.target)) {
        setIsDropdown(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isDropdown]);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const openSidebarHandler = () => {
    setShowSidebar(true);
  };

  return (
    <NavbarContainer sticky={sticky}>
      <div className="sidebar-btn" onClick={openSidebarHandler}>
        <FiMenu size={25} />
      </div>
      {!isDesktop && (
        <MobileSidebar
          categories={categories}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      )}
      <LogoContainer to="/">
        <div className="test-box">
          <img src={logo} alt="logo" />
        </div>
      </LogoContainer>
      <DropdownMenu ref={ref}>
        <div
          className="category-heading"
          onClick={() => setIsDropdown((prev) => !prev)}
        >
          <p>Category</p>
          <IoIosArrowDown size={20} />
        </div>
        {isDropdown && (
          <div className="links">
            {categories.map((category) => (
              <Link
                to={`/category/${category.name}`}
                key={category.name}
                className="link"
                onClick={() => setIsDropdown((prev) => !prev)}
              >
                <img src={category.image} alt={category.name} />
                <p>{category.name}</p>
              </Link>
            ))}
          </div>
        )}
      </DropdownMenu>
      <SearchBoxContainer>
        <IoMdSearch size={30} className="search-icon" />
        <input
          text="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            setShowClearBtn(true);
            navigate('/search');
          }}
        />
        {showClearBtn && (
          <button
            type="button"
            onClick={() => {
              setShowClearBtn(false);
              setSearchTerm('');
            }}
          >
            <IoMdCloseCircle size={20} />
          </button>
        )}
      </SearchBoxContainer>
      <div className="user-container">
        <Link to={`user-profile/${loginedUser?._id}`}>
          <UserIcon
            iconImage={loginedUser?.image}
            userName={loginedUser?.userName}
          />
          {/* <img src={loginedUser?.image} alt="user" className="user-pic" /> */}
        </Link>
        <Link to="/create-pin" className="add-btn">
          <IoMdAdd size={21} className="add-icon" />
        </Link>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
