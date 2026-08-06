import { createContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

const socket = io("http://localhost:3000", { withCredentials: true });

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
