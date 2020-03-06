import React, { useState } from 'react';
import UserProfileComponent from '../components/UserProfileComponent';
import NavBarComponent from '../components/NavBarComponent';
import PostFormComponent from '../components/PostFormComponent';


const ProfilePage = () => {
  const [postFormPopUp, setPostFormPopUp] = useState(false);
  return (
    <>
      <NavBarComponent />
      <UserProfileComponent />
      <button
        onClick={() => setPostFormPopUp(!postFormPopUp)}
        type="button"
      >
        {postFormPopUp ? 'Close' : 'Create a post'}
      </button>
      {postFormPopUp ? <PostFormComponent /> : null}

    </>
  );
};

export default ProfilePage;
