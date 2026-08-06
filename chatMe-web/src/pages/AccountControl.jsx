import React, { useState } from "react";
import ForgotPassword from "../components/ForgotPassword";
import UsersProfile from "../components/UserProfile";
import UserProfileNavbar from "../components/UserProfileNavbar";

const AccountControl = ({ profilePic, setProfilePic }) => {
  const [resetPassword, setResetPassword] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  return (
    <div>
      <UserProfileNavbar />
      {resetPassword && <ForgotPassword />}
      {userProfile && <UsersProfile />}
    </div>
  );
};

export default AccountControl;
