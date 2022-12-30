import React from 'react';

import { BlockContainer } from './AuthorDisplayBlock.styles';

import { AUTHOR_INFO } from '../../assets/constants';

const AuthorDisplayBlock = () => {
  return (
    <BlockContainer>
      <p>Built by Lion SHI</p>
      <ul className="social-links">
        {AUTHOR_INFO.map(({ title, link, icon }) => (
          <li className="social" key={title}>
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="icon-box"
            >
              {icon}
            </a>
          </li>
        ))}
      </ul>
    </BlockContainer>
  );
};

export default AuthorDisplayBlock;
