import React from "react";
import { FiUser, FiInfo, FiAtSign, FiEdit2 } from "react-icons/fi";

const UserProfile = () => {
  return (
    <div className="w-full h-full bg-[#F8FAFC] overflow-y-auto">
      {/* Top Accent */}
      <div className="h-2 bg-blue-600"></div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10">
        {/* Profile Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/300"
              alt=""
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl"
            />

            <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition">
              <FiEdit2 />
            </button>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-slate-800">John Doe</h1>

            <p className="text-blue-600 text-lg mt-1">@johndoe</p>

            <p className="text-slate-500 mt-4 max-w-2xl leading-7">
              Passionate Full Stack Developer creating beautiful and scalable
              React applications.
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

                <h3 className="font-semibold text-lg">John Doe</h3>
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

                <h3 className="font-semibold text-lg">@johndoe</h3>
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

                <p className="text-slate-700 leading-7">
                  Passionate Full Stack Developer creating beautiful,
                  responsive, and scalable web applications using React,
                  Express, Node.js, and MySQL.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
