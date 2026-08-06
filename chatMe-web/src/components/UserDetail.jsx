import React from "react";
import {
  FiUser,
  FiMail,
  FiInfo,
  FiPhone,
  FiMapPin,
  FiSlash,
} from "react-icons/fi";

const UserDetail = ({ receiverData }) => {
  return (
    <div className="flex h-full w-80 flex-col border-l bg-white">
      {/* Header */}
      <div className="border-b bg-white px-6 py-5">
        <h2 className="text-xl font-bold text-gray-800">Contact Info</h2>
      </div>

      {/* Profile */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center px-6 py-8">
          <div className="relative">
            <img
              src={receiverData.profile_picture || "/default-avatar.png"}
              alt={receiverData.full_name || "User"}
              className="h-32 w-32 rounded-full border-4 border-blue-100 object-cover shadow-md"
            />

            <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-white bg-green-500"></span>
          </div>

          <h3 className="mt-5 text-2xl font-bold text-gray-900">
            {receiverData.full_name}
          </h3>

          <p className="mt-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            Online
          </p>

          <p className="mt-6 text-center text-sm leading-7 text-gray-500">
            {receiverData.bio}
          </p>
        </div>

        {/* Details */}
        <div className="space-y-4 px-5 pb-6">
          <div className="flex items-start gap-4 rounded-xl border bg-gray-50 p-4">
            <FiUser className="mt-1 text-blue-600" size={20} />

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Username
              </p>

              <p className="mt-1 font-medium text-gray-800">
                {receiverData.user_name}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border bg-gray-50 p-4">
            <FiMail className="mt-1 text-blue-600" size={20} />

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Email
              </p>

              <p className="mt-1 text-gray-800">{receiverData.email}</p>
            </div>
          </div>

          {/* <div className="flex items-start gap-4 rounded-xl border bg-gray-50 p-4">
            <FiPhone className="mt-1 text-blue-600" size={20} />

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Phone
              </p>

              <p className="mt-1 text-gray-800">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border bg-gray-50 p-4">
            <FiMapPin className="mt-1 text-blue-600" size={20} />

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Location
              </p>

              <p className="mt-1 text-gray-800">Bangalore, India</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border bg-gray-50 p-4">
            <FiInfo className="mt-1 text-blue-600" size={20} />

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Bio
              </p>

              <p className="mt-1 text-gray-700">
                Building clean interfaces, coffee lover ☕ and always exploring
                new design trends.
              </p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-5">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600">
          <FiSlash size={18} />
          Block User
        </button>
      </div>
    </div>
  );
};

export default UserDetail;
