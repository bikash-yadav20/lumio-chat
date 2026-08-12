import React from "react";
import {
  FiUser,
  FiMail,
  FiInfo,
  FiPhone,
  FiMapPin,
  FiSlash,
} from "react-icons/fi";

import { toast } from "react-toastify";
import { blockUser, unblockUser } from "../services/client";

const UserDetail = ({ receiverData, blockStatus, setBlockStatus }) => {
  // block user
  const HandleBlockUser = async (id) => {
    try {
      await blockUser({ blocked_id: id }); // your block API
      toast.success("User blocked");
      setBlockStatus({ ...blockStatus, youBlocked: true });
    } catch (error) {
      console.error(error);
      toast.error("Failed to block user");
    }
  };

  // unblock user
  const HandleUnblockUser = async (id) => {
    try {
      await unblockUser({ blocked_id: id }); // your unblock API
      toast.success("User unblocked");
      setBlockStatus({ ...blockStatus, youBlocked: false });
    } catch (error) {
      console.error(error);
      toast.error("Failed to unblock user");
    }
  };

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
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-5">
        <button
          onClick={() =>
            blockStatus.youBlocked
              ? HandleUnblockUser(receiverData.user_id)
              : HandleBlockUser(receiverData.user_id)
          }
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white transition cursor-pointer ${
            blockStatus.youBlocked
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          <FiSlash size={18} />
          {blockStatus.youBlocked ? "Unblock" : "Block"}
        </button>
      </div>
    </div>
  );
};

export default UserDetail;
