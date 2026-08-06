import React, { useState } from "react";
import { useContext } from "react";
import { FaCamera } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { AuthContext } from "../context/authContext/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProfilePic = () => {
  const [preview, setPreview] = useState(null);
  const { updateProfilePic, setProfilePic } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleImage = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f8ff] flex justify-center items-center px-5">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#2563eb]">Almost There!</h1>

          <p className="text-gray-500 mt-2">
            Add a profile picture so your friends can recognize you.
          </p>
        </div>

        {/* Image Preview */}
        <div className="flex justify-center mt-10">
          <div className="relative">
            <div className="w-36 h-36 rounded-full border-4 border-[#dbeafe] overflow-hidden bg-[#eef4ff] flex items-center justify-center">
              {preview ? (
                <img
                  src={preview}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaCamera className="text-5xl text-[#60a5fa]" />
              )}
            </div>

            <label className="absolute bottom-2 right-1 bg-[#2563eb] p-3 rounded-full cursor-pointer hover:bg-blue-700 transition">
              <IoCloudUploadOutline className="text-white text-xl" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Upload Text */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Choose a profile picture from your device.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-4">
          <button
            onClick={async () => {
              const res = await updateProfilePic(); // call the function
              if (!res) {
                return toast.error("Failed to upload");
              }
              navigate("/chat-me"); // then navigate
              toast.success("Profile picture uploaded successfully");
            }}
            className="w-full bg-[#2563eb] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Continue
          </button>

          <button
            onClick={() => navigate("/chat-me")}
            className="w-full border border-[#2563eb] text-[#2563eb] py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
          >
            Skip for Now
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          You can always change your profile picture later.
        </p>
      </div>
    </div>
  );
};

export default AddProfilePic;
