import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import { toast } from "react-toastify";

import { IoMdLogOut } from "react-icons/io";
import { RiAddFill } from "react-icons/ri";
import { BsDot } from "react-icons/bs";
import { client } from "../../utils/client";
import {
  addFollowerRequest,
  addFollowingRequest,
  unfollowRequest,
  unfollowingRequest,
} from "../../utils/requests";
import {
  userCreatedPinsQuery,
  userSavedPinsQuery,
  userQuery,
} from "../../utils/dataQuery";
import { MasonryLayout, IconButton, UserProfileForm } from "..";
import {
  ProfileContainer,
  HeaderSection,
  PortfolioSection,
  PinsContainer,
} from "./UserProfile.styles";
import logo from "../../assets/logo.png";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";

const UserProfile = ({ loginedUser }) => {
  // CONFIGURATION
  const { userId } = useParams();
  const navigate = useNavigate();

  // STATE MANAGEMENT
  const [user, setUser] = useState(null);
  const [loginUserProfile, setLoginUserProfile] = useState(null);
  const [activeBtn, setActiveBtn] = useState("created");
  const [selected, setSelected] = useState("created");
  const [pins, setPins] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(true);

  const isFollowing = !!user?.followers?.filter(
    (item) => item?.userId === loginedUser?._id
  )?.length;

  // HANDLERS
  const logout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  const followHandler = (user) => {
    // Toggle to FOLLOW the user
    if (!isFollowing) {
      addFollowerRequest(user, loginUserProfile, client).then(() => {
        toast.success(
          `Follow ${user?.userName} successfully! Portfolio will be updated soon.`
        );
      });

      addFollowingRequest(user, loginUserProfile, client);
    } else {
      // Toggle to UNFOLLOW the user
      unfollowRequest(user, loginUserProfile, client).then(() => {
        toast.success(
          `Unfollow ${user?.userName} successfully! Portfolio will be updated soon.`
        );
      });
      unfollowingRequest(user, loginUserProfile, client);
    }
  };

  // Fetch User data
  useEffect(() => {
    const query = userQuery(userId);
    const loginUserQuery = userQuery(loginedUser?._id);

    client.fetch(query).then((data) => setUser(data[0]));
    client.fetch(loginUserQuery).then((data) => setLoginUserProfile(data[0]));
  }, [userId, loginedUser]);

  useEffect(() => {
    if (activeBtn === "created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then((data) => setPins(data));
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((data) => setPins(data));
    }
  }, [activeBtn, userId]);

  return (
    <ProfileContainer>
      <HeaderSection>
        <img src={randomImage} alt="banner" className="banner-image" />
        <Link to="/" className="logo-btn">
          <img src={logo} alt="logo" className="logo-image" />
        </Link>
        <img src={user?.image} alt="user" className="user-pfp" />
        {userId === loginedUser?._id && (
          <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="logout-btn"
              >
                <IoMdLogOut size={25} color="red" />
              </button>
            )}
            onLogoutSuccess={logout}
            cookiePolicy="single_host_origin"
          />
        )}
      </HeaderSection>
      <PortfolioSection>
        <div className="switch-box">
          <div className="user-info">
            <p className="username">{user?.userName}</p>
            {user?.about && <p className="about">{user?.about}</p>}
            <div className="follow-box">
              <span>{user?.followers?.length || 0}&nbsp;Followers</span>
              <BsDot size={20} />
              <span>{user?.followings?.length || 0}&nbsp;Following</span>
            </div>
          </div>
          <div className="button-group">
            <button
              onClick={() => {
                setSelected("created");
                setActiveBtn("created");
              }}
              type="button"
              className={`${
                activeBtn === "created" ? "switch-btn active" : "switch-btn"
              }`}
            >
              Created
            </button>
            <button
              onClick={() => {
                setSelected("saved");
                setActiveBtn("saved");
              }}
              type="button"
              className={`${
                activeBtn === "saved" ? "switch-btn active" : "switch-btn"
              }`}
            >
              Saved
            </button>
            {loginedUser?._id === user?._id && (
              <IconButton
                onClick={() => navigate("/create-pin")}
                type="button"
                className="add-btn"
              >
                <RiAddFill size={30} />
              </IconButton>
            )}
            {loginedUser?._id !== user?._id && (
              <button
                onClick={() => followHandler(user)}
                type="button"
                className={isFollowing ? "follow-btn following" : "follow-btn"}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            )}
          </div>
        </div>
        <PinsContainer>
          {pins?.length > 0 ? (
            <MasonryLayout showCreator={false} pins={pins} />
          ) : (
            <div className="no-pin-msg">
              <p>No Pins Found.</p>
            </div>
          )}
        </PinsContainer>
      </PortfolioSection>
    </ProfileContainer>
  );
};

export default UserProfile;
