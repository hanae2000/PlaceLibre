import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      alert("Vous devez être connecté pour accéder à cette page.");
      navigate("/"); 
    }
  }, [navigate]);

  return <>{children}</>; 
};

export default ProtectedRoute;
