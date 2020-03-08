import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfileAction } from '../actions/UserAction';


const UserProfileComponent = () => {
  const currentUser = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  return (
    <div>
      <p>
        <strong>My profile</strong>
      </p>
      <>
        {
        currentUser ? (
          <div>
            <p>{currentUser.name}</p>
            <p>
              Reputation:
              {
                typeof (currentUser.like_count) === 'number'
                  ? currentUser.like_count * 10 : "Can't display your like count"
              }
            </p>
            <p>
              Email:
              {currentUser.email}
            </p>
            <p>
              Description:
              {currentUser.user_details}
            </p>
            <p>
              Current location:
              {currentUser.city}
            </p>
          </div>
        ) : "Can't display your profile, you may reload to fix the issue"
      }
      </>
    </div>
  );
};

export default UserProfileComponent;
