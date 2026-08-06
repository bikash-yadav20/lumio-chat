import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/Signup";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountControl from "./pages/AccountControl";

import ChatPage from "./pages/ChatPage";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { useState } from "react";
import AddProfilePic from "./pages/AddProfilePic";

function App() {
  const [profilePic, setProfilePic] = useState(false);
  return (
    <BrowserRouter>
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
        <Route
          path="/chat-me"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
