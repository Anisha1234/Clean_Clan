import React from 'react';
import { useSelector } from 'react-redux';


const ProfilePage = () => {
  const {
    name, email, city,
    user_details: userDetails,
    like_count: likeCount,
  } = useSelector((state) => state.user.data);
  return (
    <div>
      <p>
        <strong>My profile</strong>
      </p>
      <div>
        <p>{name}</p>
        <p>
          Reputation:
          {likeCount * 10}
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

export default ProfilePage;
