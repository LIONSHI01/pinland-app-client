export const categories = [
  {
    name: 'wallpaper',
    image:
      'https://i.pinimg.com/236x/03/48/b6/0348b65919fcbe1e4f559dc4feb0ee13.jpg',
  },

  {
    name: 'photo',
    image:
      'https://i.pinimg.com/236x/72/8c/b4/728cb43f48ca762a75da645c121e5c57.jpg',
  },
  {
    name: 'food',
    image:
      'https://i.pinimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg',
  },
  {
    name: 'nature',
    image:
      'https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg',
  },
  {
    name: 'art',
    image:
      'https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg',
  },
  {
    name: 'travel',
    image:
      'https://i.pinimg.com/236x/fa/95/98/fa95986f2c408098531ca7cc78aee3a4.jpg',
  },

  {
    name: 'cats',
    image:
      'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg',
  },

  {
    name: 'others',
    image:
      'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
  },
];

export const feedQuery = `*[_type=='pin'&&!hidden]|order(_createdAt desc){
  image{
    asset->{url},},
    _id,
    destination,
    _updatedAt,
    title,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      }

  }
}`;

export const userQuery = (userId) => {
  const query = `*[_type=='user'&&_id=='${userId}']`;

  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type=='pin'&&!hidden&&title match'${searchTerm}*'||category match '${searchTerm}*'||about match'${searchTerm}*']{
image{
  asset->{
    url
  }
},
_id,
destination,
_updatedAt,
title,
postedBy->{
  _id,userName,image
},
save[]{
  _key,
  postedBy->{
    _id,
    userName,
    image
  }
}
  }`;

  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[_type=='pin'&&!hidden && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    _updatedAt,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      }
    }
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin'&& !hidden && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const pinDetailQuery = (pinId) => {
  const query = `*[_type=='pin'&&!hidden&&_id=='${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    _key,
    title,
    about,
    category,
    destination,
    _updatedAt,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      }
    },
    comments[]{
      comment,
      _key,
      _updatedAt,
      postedBy->{
        _id,
        userName,
        image
      }
    }
  }`;

  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin"&&!hidden && category == '${pin?.category}' && _id != '${pin?._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    _updatedAt,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const pinCommentsQuery = (pin) => {
  const query = `*[_type == "comment" && pin._ref=="${pin?._id}" ]{
    _id,
      comment,
      _updatedAt,
      postedBy->{
        _id,
        userName,
        image
      },
      replyTo->{
        _id,
      },
      isReply,
      likes[],
      replies[],
      "replies":*[_type=="comment" && references(^._id)]{
        _id,
      comment,
      _updatedAt,
      postedBy->{
        _id,
        userName,
        image
      },
      replyTo->{
        _id,
      },
      isReply,
      likes[],
      replies[],
      }
    }`;

  return query;
};

export const commentReplyQuery = (pin) => {
  const query = `*[_type == "comment" && pin._ref=="${pin._id}" && isReply ]{
    _id,
    comment,
    _updatedAt,
    postedBy->{
      _id,
      userName,
      image
    },
    isReply,
    likes[],
    replies[],
    "replies":*[_type=="comment" && references(^._id)]{
      _id,
    comment,
    _updatedAt,
    postedBy->{
      _id,
      userName,
      image
    },
    replyTo->{
      _id,
    },
    isReply,
    likes[],
    replies[],
    }
  }`;

  return query;
};
