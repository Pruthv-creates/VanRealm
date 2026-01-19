import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import HandlePlantOperations from "./adminpages/HandlePlantOperations";

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin-login");
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {user && <p>Welcome {user.email}</p>}
      <button onClick={handleLogout}>Logout</button>
      {/* Add plant management buttons here */}
      <HandlePlantOperations />
    </div>
  );
};

export default AdminDashboard;
