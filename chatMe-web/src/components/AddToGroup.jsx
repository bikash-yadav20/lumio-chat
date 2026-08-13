import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext/authContext";
import { FiUpload, FiSearch, FiUsers, FiX, FiCheck } from "react-icons/fi";
import { createGroup } from "../services/client";
import { toast } from "react-toastify";

const AddToGroup = () => {
  const { Users, getUsers } = useContext(AuthContext);

  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const filteredUsers =
    Users?.filter(
      (user) =>
        user.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        user.user_name?.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  //on mount fetch all users from DB
  useEffect(() => {
    getUsers();
  }, []);

  //call api to create a new group
  const handleCreateGroup = async () => {
    if (!groupName.trim()) return toast.error("Please enter group name");
    if (selectedUsers.length < 2)
      return toast.error("You need to select atleast two users");
    try {
      const res = await createGroup({
        type: "group",
        group_picture: "",
        group_name: groupName,
        members: selectedUsers,
      });
      console.log("group created", res);
      toast.success("Group created successfuly");
    } catch (error) {
      console.error("failed to create group", error);
      toast.error(error?.response?.data?.error || "Failed to create group");
    }
  };

  useEffect(() => {
    console.log("users", selectedUsers);
  }, [selectedUsers]);

  return (
    <div className="min-h-screen w-full bg-[#f5f7fb] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
              <FiUsers size={22} />
            </div>

            <div>
              <h1 className="text-xl font-semibold">Create New Group</h1>
              <p className="text-sm text-blue-100">
                Add people and start a conversation
              </p>
            </div>
          </div>
        </div>

        {/* Group Information */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-5 items-center">
            {/* Group Image */}
            <label className="relative cursor-pointer group">
              <div className="w-24 h-24 rounded-full bg-blue-50 border-2 border-dashed border-blue-300 flex flex-col items-center justify-center text-blue-500 transition group-hover:bg-blue-100 group-hover:border-blue-500">
                <FiUpload size={24} />
                <span className="text-xs font-medium mt-1">Add photo</span>
              </div>

              <input type="file" accept="image/*" className="hidden" />
            </label>

            {/* Group Name */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Group name
              </label>

              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white"
              />
            </div>
          </div>

          {/* Selected Users */}
          {selectedUsers.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-800">
                  Selected members
                </h2>

                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {selectedUsers.length} selected
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedUsers.map((userId) => {
                  const user = Users?.find((u) => u.user_id === userId);

                  return (
                    <div
                      key={userId}
                      className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full pl-1 pr-3 py-1"
                    >
                      <img
                        src={user?.profile_picture}
                        alt={user?.full_name}
                        className="w-7 h-7 rounded-full object-cover"
                      />

                      <span className="text-xs font-medium text-blue-700">
                        {user?.full_name}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleSelectUser(userId)}
                        className="text-blue-400 hover:text-red-500 transition"
                      >
                        <FiX size={15} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Search */}
          <div className="mt-7">
            <h2 className="text-sm font-semibold text-gray-800 mb-3">
              Add members
            </h2>

            <div className="relative">
              <FiSearch
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search people..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Users */}
          <div className="mt-4 border border-gray-100 rounded-xl overflow-hidden">
            <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const userId = user.user_id;
                  const isSelected = selectedUsers.includes(userId);

                  return (
                    <label
                      key={userId}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition ${
                        isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                    >
                      {/* Profile */}
                      <img
                        src={user.profile_picture}
                        alt={user.full_name}
                        className="w-11 h-11 rounded-full object-cover bg-gray-200"
                      />

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">
                          {user.full_name}
                        </p>

                        <p className="text-sm text-gray-400 truncate">
                          @{user.user_name}
                        </p>
                      </div>

                      {/* Checkbox */}
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectUser(userId)}
                          className="peer sr-only"
                        />

                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                            isSelected
                              ? "bg-blue-600 border-blue-600"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <FiCheck size={14} className="text-white" />
                          )}
                        </div>
                      </div>
                    </label>
                  );
                })
              ) : (
                <div className="py-10 text-center">
                  <FiUsers size={30} className="mx-auto text-gray-300 mb-2" />

                  <p className="text-sm text-gray-500">No users found</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-xs text-gray-400">
              {selectedUsers.length} member
              {selectedUsers.length !== 1 ? "s" : ""} selected
            </p>

            <button
              onClick={handleCreateGroup}
              type="button"
              disabled={!groupName.trim() || selectedUsers.length === 0}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 transition disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Create Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToGroup;
