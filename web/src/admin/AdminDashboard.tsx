import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import HandlePlantOperations from "./adminpages/HandlePlantOperations";
import "./AdminDashboard.css";

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

  // Placeholder data
  const numUsers = 12; // replace with actual data when available
  const numPlants = 24; // replace with actual data
  const completedOrders = 8;
  const pendingOrders = 3;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        {user && <p>Welcome, {user.email}</p>}
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>{numUsers}</p>
        </div>
        <div className="card">
          <h3>Total Plants</h3>
          <p>{numPlants}</p>
        </div>
        <div className="card">
          <h3>Orders Completed</h3>
          <p>{completedOrders}</p>
        </div>
        <div className="card">
          <h3>Orders Pending</h3>
          <p>{pendingOrders}</p>
        </div>
      </div>

      {/* Add Plant Form */}
      <div className="add-plant-form">
        <h2>Add New Plant</h2>
        <form>
          <input type="text" placeholder="Plant Name" />
          <input type="text" placeholder="Plant Type" />
          <input type="number" placeholder="Price" />
          <textarea placeholder="Description"></textarea>
          <button type="submit">Add Plant</button>
        </form>
      </div>

      {/* Plant Management Section */}
      <HandlePlantOperations />
    </div>
  );
};

export default AdminDashboard;
