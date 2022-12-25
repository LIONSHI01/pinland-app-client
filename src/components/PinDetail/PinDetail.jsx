import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { useParams, useNavigate } from 'react-router-dom';

import { FaArrowLeft } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';

import { FiLink } from 'react-icons/fi';

import { client, urlFor } from '../../utils/client';
import {
  MasonryLayout,
  Spinner,
  CreatorItem,
  DropdownMenu,
  IconButton,
  CommentList,
  EditPinForm,
} from '..';
import {
  userQuery,
  pinDetailQuery,
  pinDetailMorePinQuery,
  pinCommentsQuery,
} from '../../utils/dataQuery';
import {
  toggleSaveRequest,
  createCommentRequest,
  deletePinRequest,
} from '../../utils/requests';

import { userSavedPinsQuery } from '../../utils/dataQuery';

import {
  PinDetailPageContainer,
  PinDetailContainer,
  ContentContainer,
  ImageContainer,
  SimilarPinsContainer,
  LoadingContainer,
} from './PinDetail.styles';

const PinDetail = ({ loginedUser }) => {
  // STATE MANAGEMENT
  const [pinDetail, setPinDetail] = useState(null);
  const [similarPins, setSimilarPins] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loadingSimilarPins, setLoadingSimilarPins] = useState(false);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const [savedPins, setSavedPins] = useState(null);
  const [creator, setCreator] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [pinComments, setPinComments] = useState(null);

  // CONFIGURATION
  const { pinId } = useParams();
  const navigate = useNavigate();
  const isSaved = !!pinDetail?.save?.filter(
    (item) => item?.postedBy._id === loginedUser?._id
  )?.length;

  const isFollowing = !!loginedUser?.followings?.filter(
    (item) => item?.userId === creator?._id
  ).length;

  const isSamePerson = creator?._id === loginedUser?._id;

  // HANDLERS
  const fetchDataHandler = () => {
    // console.log('Fetching Pin Details');
    setLoadingDetail(true);
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);
        setLoadingDetail(false);

        if (data[0]) {
          // Fetch similar pins
          setLoadingSimilarPins(true);
          query = pinDetailMorePinQuery(data[0]);
          client.fetch(query).then((data) => {
            setSimilarPins(data);
            setLoadingSimilarPins(false);
          });

          const commentsQuery = pinCommentsQuery(data[0]);
          client.fetch(commentsQuery).then((data) => {
            setPinComments(data);
          });
          // Fetch Pin Creator Profile
          const creatorQuery = userQuery(data[0]?.postedBy?._id);
          client.fetch(creatorQuery).then((data) => setCreator(data[0]));
        }
      });
    }
  };

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      const doc = {
        _type: 'comment',
        pin: {
          _type: 'reference',
          _ref: pinDetail?._id,
        },
        postedBy: {
          _type: 'postedBy',
          _ref: loginedUser?._id,
        },
        hidden: false,
        isReply: false,
        comment,
      };

      createCommentRequest(doc, client).then(() => {
        setAddingComment(false);
        setComment('');
        toast.success('Commented successfully!');
      });
    } else {
      toast.error('No content entered, please try again.');
    }
  };

  const toggleSavePin = (pin) => {
    toggleSaveRequest(pin, loginedUser, client, toast);
  };

  const deletePin = () => {
    deletePinRequest(pinDetail, client);
  };

  // DATA FETCHING
  useEffect(() => {
    fetchDataHandler();
    // Fetch Saved Pins
    const savedPinsQuery = userSavedPinsQuery(loginedUser?._id);

    client.fetch(savedPinsQuery).then((data) => setSavedPins(data));
  }, [pinId]);

  if (loadingDetail)
    return (
      <LoadingContainer>
        <Spinner message="Preparing pin details.." />;
      </LoadingContainer>
    );

  return (
    <PinDetailPageContainer>
      <button type="button" className="goback-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft size={20} />
      </button>
      <PinDetailContainer>
        <ImageContainer>
          {pinDetail && (
            <div className="image-box">
              <img
                src={urlFor(pinDetail?.image).width(800).url()}
                className="pin-image"
                alt="pin"
              />
              <a
                type="button"
                className="view-image-btn"
                href={pinDetail?.image?.asset?.url}
                target="_blank"
                rel="noreferrer"
              >
                <FiArrowUpRight size={30} />
                <p>View Image</p>
              </a>
            </div>
          )}
        </ImageContainer>
        <ContentContainer>
          <div className="details-container">
            <div className="info-top">
              <div className="destination-box">
                <div className="buttons-group">
                  <DropdownMenu
                    pin={pinDetail}
                    deletePin={deletePin}
                    isSamePerson={isSamePerson}
                    setShowEditForm={setShowEditForm}
                  />
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${pinDetail?.destination}`
                      );
                      toast.success('Saved link to clipboard.');
                    }}
                  >
                    <FiLink size={20} />
                  </IconButton>
                </div>
                <a
                  href={pinDetail?.destination}
                  target="_blank"
                  rel="noreferrer"
                  className="destination"
                >
                  {pinDetail?.destination?.split('.com')[0] + '.com'}
                </a>
              </div>
              <button
                className={isSaved ? 'save-btn saved' : 'save-btn'}
                onClick={() => toggleSavePin(pinDetail)}
              >
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
            <h2 className="title">{pinDetail?.title}</h2>
            <p className="about">{pinDetail?.about}</p>

            <div className="creator-info">
              <CreatorItem
                creator={creator}
                isFollowing={isFollowing}
                loginUserProfile={loginedUser}
                isSamePerson={isSamePerson}
              />
            </div>
          </div>
          <CommentList
            pinDetail={pinDetail}
            pinComments={pinComments}
            loginedUser={loginedUser}
            comment={comment}
            isSamePerson={isSamePerson}
            addComment={addComment}
            addingComment={addingComment}
            setComment={setComment}
          />

          {showEditForm && (
            <EditPinForm
              pin={pinDetail}
              setShowEditForm={setShowEditForm}
              loginedUser={loginedUser}
            />
          )}
        </ContentContainer>
      </PinDetailContainer>
      <SimilarPinsContainer>
        <h4>More Similar Pins</h4>
        {loadingSimilarPins && (
          <Spinner message="Loading similar pins for you..." />
        )}
        {similarPins?.length === 0 && (
          <div className="No-similar-pin">No similar pins found.</div>
        )}
        {similarPins && <MasonryLayout pins={similarPins} />}
      </SimilarPinsContainer>
    </PinDetailPageContainer>
  );
};

export default PinDetail;
