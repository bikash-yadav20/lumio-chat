import React, { useContext } from "react";
import { FiUser, FiInfo, FiAtSign, FiEdit2, FiLogOut } from "react-icons/fi";
import { AuthContext } from "../context/authContext/authContext";

const UserProfile = () => {
  const { loggedInUser, logout } = useContext(AuthContext);

  return (
    <div className="w-full h-full bg-[#F8FAFC] overflow-y-auto">
      {/* Top Accent */}
      <div className="h-2 bg-blue-600"></div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10">
        {/* Profile Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          <div className="relative">
            <img
              src={loggedInUser.profile_picture}
              alt=""
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl"
            />

            <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition">
              <FiEdit2 />
            </button>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-slate-800">
              {loggedInUser.full_name}
            </h1>

            <p className="text-blue-600 text-lg mt-1">
              {loggedInUser.user_name}
            </p>

            <p className="text-slate-500 mt-4 max-w-2xl leading-7">
              {loggedInUser.bio}
            </p>

            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Information */}
        <div className="grid lg:grid-cols-2 gap-6 mt-12">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <FiUser className="text-blue-600 text-xl" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Full Name</p>

                <h3 className="font-semibold text-lg">
                  {loggedInUser.full_name}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <FiAtSign className="text-blue-600 text-xl" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Username</p>

                <h3 className="font-semibold text-lg">
                  {loggedInUser.user_name}
                </h3>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <FiInfo className="text-blue-600 text-xl" />
              </div>

              <div>
                <p className="text-sm text-slate-500 mb-2">Bio</p>

                <p className="text-slate-700 leading-7">{loggedInUser.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-10 flex justify-center lg:justify-start">
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-6 py-3 font-semibold text-red-600 shadow-sm transition hover:bg-red-50"
          >
            <FiLogOut size={19} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
