import React, { useContext, useEffect } from "react";
import { MdMoreVert } from "react-icons/md";
import { HiOutlineSearch } from "react-icons/hi";
import { AuthContext } from "../context/authContext/authContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { loggedInUser, fetchLoggedUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetchLoggedUser();
  }, []);
  return (
    <nav className="w-full h-14 bg-white border-b border-gray-300 flex items-center justify-between px-3 sm:px-4">
      {/* Left */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <img
          onClick={() => {
            fetchLoggedUser();
            navigate("/account");
          }}
          src={loggedInUser.profile_picture}
          alt="Profile"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full cursor-pointer"
        />

        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700 whitespace-nowrap">
          Lumio Chat
        </h1>
      </div>

      {/* Center Search (Hidden on Mobile) */}
      <div className="hidden md:flex flex-1 justify-center px-4 lg:px-8">
        <div className="relative w-full max-w-lg">
          <HiOutlineSearch
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full h-10 rounded-full border border-gray-300 bg-gray-50 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <HiOutlineSearch size={20} className="text-blue-600" />
        </button>

        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <MdMoreVert size={22} className="text-blue-600" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
