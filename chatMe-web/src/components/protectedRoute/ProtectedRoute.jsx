import { Children, useEffect, useState } from "react";
import { getMe } from "../../services/client";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    getMe()
      .then((res) => setAuth(res))
      .catch((err) => setAuth(false));
  }, []);

  if (auth === null) return <p>Loading...</p>;

  return auth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
