import React, { useState } from "react";

import UsersProfile from "../components/UserProfile";
import UserProfileNavbar from "../components/UserProfileNavbar";

const AccountControl = ({ profilePic, setProfilePic }) => {
  return (
    <div>
      <UserProfileNavbar />
      <UsersProfile />
    </div>
  );
};

export default AccountControl;
