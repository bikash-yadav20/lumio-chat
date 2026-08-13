import { createContext, useEffect, useState } from "react";
import {
  getUsers as fetchUsers,
  getLoggedUser,
  uploadDp,
  logoutUser,
} from "../../services/client";
import { getMe } from "../../services/client";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [Users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [profilePic, setProfilePic] = useState(null);

  const navigate = useNavigate();

  //get logged in users profile data
  const fetchLoggedUser = async () => {
    try {
      const user = await getLoggedUser();
      setLoggedInUser(user);
    } catch (error) {
      console.error(error.message);
    }
  };

  // get logged in users
  const fetchCurrentUser = async () => {
    try {
      const data = await getMe();
      setCurrentUser(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  //update profile picture
  const updateProfilePic = async () => {
    try {
      if (!profilePic) return;
      const res = await uploadDp(profilePic);
      return res;
    } catch (error) {
      console.log("Upload failed", error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  //get users
  const getUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  //logout user

  const logout = async () => {
    try {
      const data = await logoutUser();
      console.log("log out success", data);
      setLoggedInUser(null);
      navigate("/login");
    } catch (error) {
      console.error("failed to logout", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        Users,
        getUsers,
        currentUser,
        fetchCurrentUser,
        fetchLoggedUser,
        loggedInUser,
        updateProfilePic,
        setProfilePic,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
