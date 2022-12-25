import styled from 'styled-components';

export const ProfileContainer = styled.div``;

export const HeaderSection = styled.div`
  position: relative;
  margin-bottom: var(--mg-x);

  button {
    border: none;
  }

  .banner-image {
    height: 20rem;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  .logo-btn {
    height: 4rem;
    width: 4rem;
    position: absolute;
    top: 3rem;
    left: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--white);
    border-radius: 100px;
    cursor: pointer;
    border: none;
  }

  .logo-image {
    height: 2.5rem;
    width: 2.5rem;
  }
  .user-pfp {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    height: 10rem;
    width: 10rem;
    border-radius: 50%;
  }

  .logout-btn {
    position: absolute;
    top: 3rem;
    right: 3rem;
    border: none;
    height: 4rem;
    width: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--white);
    border-radius: 100px;
    cursor: pointer;
  }
`;

export const PortfolioSection = styled.div`
  width: 100%;
  height: auto;
  position: relative;

  .switch-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: var(--mg-x);
  }
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: var(--mg-m);
    margin-top: var(--mg-s);
  }
  .username {
    font-size: var(--fs-x);
    margin-bottom: var(--mg-s);
    font-weight: 600;
  }
  .about {
    font-size: var(--fs);
    color: var(--black-light-2);
  }

  .button-group {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    button {
      transition: all 0.3s;

      :active {
        scale: 0.85;
      }
    }
  }

  .switch-btn {
    display: flex;
    justify-content: center;
    width: 12rem;
    font-size: var(--fs);
    padding: 1.2rem 2rem;
    border: none;
    background-color: var(--white);
    border-radius: 100px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;

    :hover {
      background-color: var(--black-light-3);
    }
  }

  .follow-box {
    display: flex;
    align-items: center;
    font-size: var(--fs-s);
    color: var(--black-light-2);
  }

  .follow-btn {
    display: flex;
    justify-content: center;
    width: 12rem;
    font-size: var(--fs);
    padding: 1.2rem 2rem;
    border: 2px solid var(--red);
    background-color: transparent;
    border-radius: 100px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;

    :hover {
      background-color: var(--grey-light-2);
    }
  }

  .following {
    background-color: var(--black);
    color: var(--white);
    border: 2px solid transparent;
    :hover {
      background-color: var(--black);
    }
  }

  .active {
    background-color: var(--red);
    color: var(--white);

    :hover {
      background-color: var(--red);
    }
  }

  .add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    height: 4rem;
    width: 4rem;
    border-radius: 100px;
    cursor: pointer;

    :hover {
      background-color: var(--black-light-3);
    }
  }

  .no-pin-msg {
    font-size: var(--fs-xl);
    font-weight: 600;
    color: var(--black-light-2);
    text-align: center;
  }
`;

export const PinsContainer = styled.div`
  margin: 0 var(--mg-x);
`;
