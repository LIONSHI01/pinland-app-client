import { v4 as uuidv4 } from 'uuid';

// PIN
export const updatePinRequest = (pin, doc, clientCB) => {
  const res = clientCB.patch(pin?._id).set(doc).commit();

  return res;
};

export const deletePinRequest = (pin, clientCB) => {
  const res = clientCB.patch(pin?._id).set({ hidden: true }).commit();

  return res;
};

export const savePinRequest = (pin, loginedUser, clientCB) => {
  const res = clientCB
    .patch(pin?._id)
    .setIfMissing({ save: [] })
    .insert('after', 'save[-1]', [
      {
        _key: uuidv4(),
        userId: loginedUser?.googleId || loginedUser?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: loginedUser?.googleId || loginedUser?._id,
        },
      },
    ])
    .commit();

  return res;
};

// SAVE
export const unSaveRequest = (pin, loginedUser, clientCB) => {
  const saving = pin?.save?.filter(
    (item) => item?.postedBy?._id === loginedUser?._id || loginedUser?.googleId
  );

  const saveToRemove = ['save[0]', `save[_key=="${saving?._key}"]`];

  const res = clientCB.patch(pin?._id).unset(saveToRemove).commit();

  return res;
};

export const toggleSaveRequest = (pin, loginedUser, clientCB, toastCB) => {
  let res;

  const isSaved = !!pin?.save?.filter(
    (item) => item?.postedBy._id === loginedUser?._id || loginedUser?.googleId
  )?.length;

  if (isSaved) {
    res = unSaveRequest(pin, loginedUser, clientCB).then(() => {
      toastCB.success(`Unsaved <${pin?.title}> from your portfolio.`);
    });
  } else if (!isSaved) {
    res = savePinRequest(pin, loginedUser, clientCB).then(() => {
      toastCB.success(`Saved <${pin?.title}> to your portfolio.`);
    });
  }

  return res;
};

// FOLLOW
export const addFollowingRequest = (user, loginedUser, clientCB) => {
  const res = clientCB
    .patch(loginedUser?._id)
    .setIfMissing({ followings: [] })
    .insert('after', 'followings[-1]', [
      {
        _key: uuidv4(),
        userId: user?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user?._id,
        },
      },
    ])
    .commit();

  return res;
};

export const addFollowerRequest = (user, loginedUser, clientCB) => {
  const res = clientCB
    .patch(user?._id)
    .setIfMissing({ followers: [] })
    .insert('after', 'followers[-1]', [
      {
        _key: uuidv4(),
        userId: loginedUser?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: loginedUser?._id,
        },
      },
    ])
    .commit();

  return res;
};

export const unfollowRequest = (user, loginedUser, clientCB) => {
  const follower = user?.followers?.filter(
    (item) => item?.userId === loginedUser?._id
  );
  const followerToRemove = [
    'followers[0]',
    `followers[_key=="${follower?._key}"]`,
  ];

  const res = clientCB.patch(user._id).unset(followerToRemove).commit();

  return res;
};

export const unfollowingRequest = (user, loginedUser, clientCB) => {
  // console.log(loginedUser);
  const followingUser = loginedUser?.followings?.filter(
    (item) => item?.userId === user?._id
  );
  const followingUserToRemove = [
    'followings[0]',
    `followings[_key=="${followingUser?._key}"]`,
  ];

  const res = clientCB
    .patch(loginedUser._id)
    .unset(followingUserToRemove)
    .commit();

  return res;
};

// LIKE COMMENT
export const likeCommentRequest = (comment, loginedUser, clientCB) => {
  const res = clientCB
    .patch(comment._id)
    .setIfMissing({ likes: [] })
    .insert('after', 'likes[-1]', [
      {
        _key: uuidv4(),
        userId: loginedUser?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: loginedUser?._id,
        },
      },
    ])
    .commit();

  return res;
};

export const toggleLikeCommentRequest = (comment, loginedUser, clientCB) => {
  let res;
  const isLiked = !!comment?.likes?.filter(
    (item) => item.userId === loginedUser?._id
  )?.length;

  if (!isLiked) {
    res = clientCB
      .patch(comment?._id)
      .setIfMissing({ likes: [] })
      .insert('after', 'likes[-1]', [
        {
          _key: uuidv4(),
          userId: loginedUser?._id,
          postedBy: {
            _type: 'postedBy',
            _ref: loginedUser?._id,
          },
        },
      ])
      .commit();
  } else if (isLiked) {
    const likeToRemoveItem = comment?.likes?.filter(
      (item) => item.userId === loginedUser?._id
    );
    console.log('likeToRemoveItem', likeToRemoveItem);

    const likeToRemove = [
      'likes[0]',
      `likes[_key=="${likeToRemoveItem[0]?._key}"]`,
    ];

    res = clientCB
      .patch(comment._id)
      .setIfMissing({ likes: [] })
      .unset(likeToRemove)
      .commit();
  }

  return res;
};

// COMMENT
// TEMPLE
export const addCommentRequest = (pinId, comment, loginedUser, clientCB) => {
  const res = clientCB
    .patch(pinId)
    .setIfMissing({ comments: [] })
    .insert('after', 'comments[-1]', [
      {
        comment,
        _key: uuidv4(),
        _updatedAt: new Date().toISOString(),
        postedBy: {
          _type: 'postedBy',
          _ref: loginedUser._id,
        },
      },
    ])
    .commit();

  return res;
};

export const createCommentRequest = (doc, clientCB) => {
  const res = clientCB.create(doc);

  return res;
};

export const deleteCommentRequest = (comment, clientCB) => {
  const res = clientCB.delete(comment?._id);

  return res;
};

export const editCommentRequest = (commentToEdit, newComment, clientCB) => {
  const res = clientCB
    .patch(commentToEdit._id)
    .set({
      comment: newComment,
      _key: uuidv4(),
      _updatedAt: new Date().toISOString(),
    })
    .commit();
  return res;
};

export const replyCommentRequest = (
  pin,
  commentReplyTo,
  reply,
  loginedUser,
  clientCB
) => {
  const replyDoc = {
    _type: 'comment',
    pin: {
      _type: 'reference',
      _ref: pin?._id,
    },
    postedBy: {
      _type: 'postedBy',
      _ref: loginedUser?._id,
    },
    replyTo: {
      _type: 'reference',
      _ref: commentReplyTo?._id,
    },
    isReply: true,
    comment: reply,
  };
  const res = clientCB.create(replyDoc);

  return res;
};
