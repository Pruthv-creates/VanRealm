import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { ReactElement } from "react";

interface RoleRouteProps {
  element: ReactElement;
  requiredRole: "admin" | "user";
}

const RoleRoute = ({ element, requiredRole }: RoleRouteProps) => {
  const [status, setStatus] = useState<"loading" | "allowed" | "denied">(
    "loading",
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus("denied");
        return;
      }
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const role = userDoc.data()?.role;
      if (role === requiredRole) {
        setStatus("allowed");
      } else {
        setStatus("denied");
      }
    });
    return () => unsubscribe();
  }, [requiredRole]);

  if (status === "loading") return <div>Loading...</div>;
  return status === "allowed" ? element : <Navigate to="/" />;
};

export default RoleRoute;
