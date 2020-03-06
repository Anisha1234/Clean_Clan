import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfileAction } from '../actions/UserAction';


const UserProfileComponent = () => {
  const {
    name, email, city,
    user_details: userDetails,
    like_count: likeCount,
  } = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfileAction());
  });

  return (
    <div>
      <p>
        <strong>My profile</strong>
      </p>
      <div>
        <p>{name}</p>
        <p>
          Reputation:
          {(likeCount && typeof (likeCount) === 'number' ? likeCount * 10 : 0)}
        </p>
        <p>
          Email:
          {email}
        </p>
        <p>
          Description:
          {userDetails}
        </p>
        <p>
          Current location:
          {city}
        </p>
      </div>
    </div>
  );
};

export default UserProfileComponent;
