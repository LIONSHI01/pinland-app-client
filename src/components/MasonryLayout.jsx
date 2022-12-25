import React from 'react';
import Masonry from 'react-masonry-css';

import { Pin } from './';

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins, showCreator }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="masonry-layout-styles"
    >
      {pins?.map((pin) => (
        <Pin showCreator={showCreator} key={pin?._id} pin={pin} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
