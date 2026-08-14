import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/Signup";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AccountControl from "./pages/AccountControl";

import ChatPage from "./pages/ChatPage";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { useState } from "react";
import AddProfilePic from "./pages/AddProfilePic";
import Group from "./pages/Group";
import { SocketProvider } from "./context/socketContext/socketContext";
import { AuthProvider } from "./context/authContext/authContext";

function App() {
  const [profilePic, setProfilePic] = useState(false);
  return (
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <ToastContainer />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/signup"
              element={<Signup setProfilePic={setProfilePic} />}
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <AccountControl profilePic={profilePic} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-profile-pic"
              element={
                <ProtectedRoute>
                  <AddProfilePic />
                </ProtectedRoute>
              }
            />

            {/* defaulte route */}
            <Route path="/" element={<Navigate to="/chat-me" replace />} />
            <Route
              path="/chat-me"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-group"
              element={
                <ProtectedRoute>
                  <Group />
                </ProtectedRoute>
              }
            />
          </Routes>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
