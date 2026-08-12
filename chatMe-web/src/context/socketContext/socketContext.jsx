// src/context/socketContext/socketContext.js
import React, { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../authContext/authContext";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const socket = useMemo(() => {
    if (!currentUser) return null;
    return io(process.env.VITE_SOCKET_URL, {
      auth: { userId: currentUser.user_id },
      withCredentials: true,
    });
  }, [currentUser]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
