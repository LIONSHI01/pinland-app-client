import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { MdDownloadForOffline } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { BiLinkAlt } from 'react-icons/bi';
import { urlFor, client } from '../../utils/client';
import { fetchUser } from '../../utils/fetchUser';
import { toggleSaveRequest, deletePinRequest } from '../../utils/requests';
import Button from '../Button';
import { WarningModal, UserIcon } from '..';

import {
  PinContainer,
  ContentContainer,
  SubContentContainer,
  UpperContent,
  LowerContent,
  PostedByContainer,
} from './Pin.styles';

const Pin = ({
  pin,
  pin: { postedBy, image, _id, title, destination, save },
  showCreator = true,
}) => {
  // CONFIGURATION
  const navigate = useNavigate();
  const user = fetchUser();
  const alreadySaved = !!save?.filter(
    (item) => item?.postedBy?._id === user?.googleId
  )?.length;

  const isSamePerson = user.googleId === postedBy?._id;

  // STATE MANAGEMENT
  const [postHovered, setPostHovered] = useState(false);
  const [showWarnModal, setShowWarnModal] = useState(false);

  const toggleSavePin = (pin) => {
    toggleSaveRequest(pin, user, client, toast);
  };

  const deletePin = () => {
    deletePinRequest(pin, client).then(() => {
      toast.success(
        'Deleted pin successfully! Portfolio will be updated soon.'
      );
    });
  };

  return (
    <>
      <PinContainer>
        <ContentContainer
          onMouseEnter={() => setPostHovered(true)}
          onMouseLeave={() => setPostHovered(false)}
          onClick={() => navigate(`/pin-detail/${_id}`)}
        >
          {image && (
            <img
              src={urlFor(image).width(250).url()}
              alt={title}
              className="pin-image"
            />
          )}
          {postHovered && (
            <SubContentContainer>
              <UpperContent>
                <div className="download-box">
                  <a
                    href={`${image?.asset?.url}?dl=`}
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="download-link"
                  >
                    <MdDownloadForOffline size={20} className="download-icon" />
                  </a>
                </div>
                {alreadySaved ? (
                  <Button
                    size="m"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSavePin(pin);
                    }}
                  >
                    {save?.length}&nbsp;Saved
                  </Button>
                ) : (
                  <Button
                    size="m"
                    onClick={(e) => {
                      e.stopPropagation();

                      toggleSavePin(pin);
                    }}
                  >
                    Save
                  </Button>
                )}
              </UpperContent>
              <LowerContent>
                {destination && (
                  <div className="destination-box">
                    <BiLinkAlt size={20} />
                    <a href={destination} target="_blank" rel="noreferrer">
                      {destination.length > 15
                        ? `${destination.slice(0, 15)}...`
                        : destination}
                    </a>
                  </div>
                )}
                {isSamePerson && (
                  <button
                    className="delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowWarnModal(true);
                    }}
                  >
                    <AiFillDelete size={20} />
                  </button>
                )}
              </LowerContent>
            </SubContentContainer>
          )}
        </ContentContainer>
        {showCreator && (
          <PostedByContainer to={`/user-profile/${postedBy?._id}`}>
            <UserIcon iconImage={postedBy?.image} />
            <p>{postedBy?.userName}</p>
          </PostedByContainer>
        )}
      </PinContainer>
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

export default Pin;
