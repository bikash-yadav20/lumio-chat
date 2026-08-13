import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  MdChatBubble,
  MdAlternateEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdArrowForward,
  MdCheckCircle,
  MdFileDownload,
} from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

import { login } from "../services/client";

import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(
        {
          user_name: userName,
          password: password,
        },
        {
          withCredentials: true,
        },
      );

      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 1500);
      toast.success("Login successfull");
      navigate("/chat-me");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Network error. Please try again later.");
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f8f9fa] px-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl"></div>

        <div className="absolute bottom-0 left-0 h-[450px] w-[450px] rounded-full bg-indigo-500/5 blur-3xl"></div>
      </div>

      <div className="w-full max-w-[440px] animate-fadeIn">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-blue-700 shadow-lg shadow-blue-500/20">
            <MdChatBubble className="text-3xl text-white" />
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-blue-700">
            Lumio Chat
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Connecting people through elegant design.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md backdrop-blur">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="mb-2 ml-1 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                User name
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="username"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-4 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-semibold text-blue-700 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-12 pr-12 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <MdVisibilityOff size={22} />
                  ) : (
                    <MdVisibility size={22} />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              disabled={loading}
              className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold text-white transition-all duration-200 active:scale-95 ${
                success ? "bg-orange-500" : "bg-blue-700 hover:bg-blue-800"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="opacity-20"
                    />

                    <path
                      fill="currentColor"
                      className="opacity-80"
                      d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : success ? (
                <>
                  <MdCheckCircle size={22} />
                  Success
                </>
              ) : (
                <>
                  Login
                  <MdArrowForward
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          {/* Divider */}

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-[11px] font-semibold tracking-wider text-gray-400">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          {/* Social Login */}

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 py-3 transition hover:bg-gray-50 active:scale-95">
              <FcGoogle size={22} />

              <span className="text-sm text-gray-600">Google</span>
            </button>
          </div>
        </div>

        {/* Footer */}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?
            <Link
              to="/signup"
              className="ml-2 font-semibold text-blue-700 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeIn{
          from{
            opacity:0;
            transform:translateY(10px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        .animate-fadeIn{
          animation:fadeIn .6s cubic-bezier(.16,1,.3,1);
        }
      `}</style>
    </div>
  );
}
