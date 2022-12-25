import React, { useState, useEffect, useRef } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import styled from 'styled-components';

import { WarningModal } from '..';

const MenuContainer = styled.div`
  position: relative;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    height: 4rem;
    width: 4rem;
    border-radius: 50%;

    cursor: pointer;
    transition: all 0.3s;

    :hover {
      background-color: var(--grey-light-2);
    }

    :active {
      scale: 0.85;
    }
  }

  .window {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 19rem;
    transform: translateY(130%);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: var(--white);
    box-shadow: var(--bs-s);
    border-radius: var(--br-s);
    padding: 1rem;
  }

  li {
    border-radius: var(--br-s);
    padding: 0.8rem 1.6rem;
    font-size: var(--fs-s);
    cursor: pointer;

    :hover {
      background-color: var(--grey-light-2);
    }
  }
`;

const DropdownMenu = ({
  pin,
  deletePin,
  isSamePerson = false,
  setShowEditForm,
}) => {
  // STATE MANAGEMENT
  const [isDropdown, setIsDropdown] = useState(false);
  const [showWarnModal, setShowWarnModal] = useState(false);

  // CONFIGURATION
  const ref = useRef();

  // HANDLERS
  const toggleHandler = () => setIsDropdown((prev) => !prev);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isDropdown && ref.current && !ref.current.contains(e.target)) {
        setIsDropdown(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isDropdown]);

  return (
    <>
      <MenuContainer ref={ref}>
        {
          <button onClick={toggleHandler}>
            <BsThreeDots size={20} />
          </button>
        }
        {isDropdown && (
          <ul className="window">
            {isSamePerson && (
              <li
                onClick={() => {
                  setShowEditForm(true);
                  setIsDropdown(false);
                }}
              >
                Edit Pin
              </li>
            )}
            <a href={`${pin?.image?.asset?.url}?dl=`} download>
              <li onClick={() => setIsDropdown(false)}>Download Image</li>
            </a>
            {isSamePerson && (
              <li
                onClick={() => {
                  setShowWarnModal(true);
                  setIsDropdown(false);
                }}
              >
                Delete Pin
              </li>
            )}
          </ul>
        )}
      </MenuContainer>
      {showWarnModal && (
        <WarningModal
          message="Once the pin is deleted, you cannot undo it."
          setConfirmFn={deletePin}
          setShowWarnModal={setShowWarnModal}
        />
      )}
    </>
  );
};

export default DropdownMenu;
