import React, { useContext } from "react";
import { MdMoreVert } from "react-icons/md";
import { HiOutlineSearch } from "react-icons/hi";
import { AuthContext } from "../context/authContext/authContext";

const UserProfileNavbar = () => {
  const { loggedInUser, fetchLoggedUser } = useContext(AuthContext);

  useEffect(() => {
    fetchLoggedUser();
  }, []);
  return (
    <nav className="w-full h-14 bg-white border-b border-gray-300 flex items-center justify-between px-3 sm:px-4">
      {/* Left */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <img
          src={loggedInUser.profile_picture}
          alt="Profile"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full"
        />

        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700 whitespace-nowrap">
          Lumio Chat
        </h1>
      </div>
    </nav>
  );
};

export default UserProfileNavbar;
