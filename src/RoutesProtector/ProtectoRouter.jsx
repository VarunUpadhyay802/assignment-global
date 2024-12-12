import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRouter({ children, token }) {
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRouter;
