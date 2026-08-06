import React, { useState } from "react";
import { FaEnvelope, FaShieldAlt, FaArrowRight } from "react-icons/fa";
import { BsChatSquareFill } from "react-icons/bs";

const ForgotPassword = () => {
  const [otp, setOtp] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#2952E3] flex items-center justify-center shadow-lg">
            <BsChatSquareFill className="text-white text-2xl" />
          </div>

          <h1 className="mt-5 text-4xl font-bold text-[#2952E3]">
            Lumina Chat
          </h1>

          <p className="mt-2 text-gray-500">Reset your account password</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
          {!otp ? (
            <>
              {/* Email */}
              <label className="mb-2 ml-1 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Registered Email
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-[#2952E3] focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <button
                onClick={() => setOtp(true)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2952E3] py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Send OTP
                <FaArrowRight />
              </button>
            </>
          ) : (
            <>
              {/* OTP */}
              <label className="mb-2 ml-1 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Enter OTP
              </label>

              <div className="relative">
                <FaShieldAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-[#2952E3] focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2952E3] py-3 font-semibold text-white transition hover:bg-blue-700">
                Verify OTP
                <FaArrowRight />
              </button>

              <button
                onClick={() => setOtp(false)}
                className="mt-4 w-full text-center font-medium text-[#2952E3] hover:underline"
              >
                Change Email
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
