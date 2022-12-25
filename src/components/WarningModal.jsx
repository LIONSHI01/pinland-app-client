import React, { useEffect } from 'react';
import styled from 'styled-components';
import Overlay from './Overlay';
import Button, { BUTTON_TYPES_CLASSES } from './Button';

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 2rem 5rem;
  background-color: var(--white);
  border-radius: var(--br-m);

  z-index: 2000;

  .heading {
    font-size: var(--fs-xl);
    text-align: center;
    margin-bottom: var(--mg-m);
  }

  .message {
    font-size: var(--fs);
    margin-bottom: var(--mg-m);
  }

  .buttons-group {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`;

const WarningModal = ({ message, setConfirmFn, setShowWarnModal }) => {
  return (
    <>
      <ModalContainer>
        <h4 className="heading">Are you sure ?</h4>
        <p className="message">{message}</p>
        <div className="buttons-group">
          <Button
            buttonType={BUTTON_TYPES_CLASSES.grey}
            onClick={() => {
              setShowWarnModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            buttonType={BUTTON_TYPES_CLASSES.base}
            onClick={() => {
              setConfirmFn('');
              setShowWarnModal(false);
            }}
          >
            Confirm
          </Button>
        </div>
      </ModalContainer>
      <Overlay bgColor="black" setState={setShowWarnModal} />
    </>
  );
};

export default WarningModal;
