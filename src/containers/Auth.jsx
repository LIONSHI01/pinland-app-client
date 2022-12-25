import React, { useEffect } from 'react';
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { FcGoogle } from 'react-icons/fc';
import { client } from '../utils/client';

import loginVideo from '../assets/share.mp4';
import { useNavigate } from 'react-router-dom';

const AuthContainer = styled.main`
  width: 100vw;
  height: 100vh;
  .content-container {
    position: relative;
  }

  .video {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }

  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .google-btn {
    cursor: pointer;
    background-color: var(--white);
    border: none;
    padding: 1rem 2rem;
    font-size: var(--fs);
    color: var(--black);

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    border-radius: var(--br-s);
  }
`;

const Auth = () => {
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  }, []);

  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;

    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <AuthContainer>
      <div className="content-container">
        <video
          src={loginVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="video"
        />
        <div className="login-container">
          <div className="login-box">
            <GoogleLogin
              clientId={clientId}
              render={(renderProps) => (
                <button
                  type="button"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="google-btn"
                >
                  <FcGoogle size={30} />
                  Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Auth;
